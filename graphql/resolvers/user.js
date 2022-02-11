const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.AUTH_TOKEN_EXPIRES
    });
}

module.exports = {
    Mutation: {
        async register(_, {
            registerInput: { username, email, password, confirmPassword }
        }) {
            // TODO validate user data
            // Make sure user does not already exists
            // hash password and create an auth token
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "This username is taken"
                    }
                })
            }
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const token = generateToken(res);
            // console.log({ res, token });
            return {
                id: res._id,
                email: res.email,
                username: res.username,
                password: res.password,
                createdAt: res.createdAt,
                token
            }
        },
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }
            const user = await User.findOne({ username });
            if (!user) {
                errors.general = "User not found";
                throw new UserInputError("User not found", { errors });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = "Wrong Credentails";
                throw new UserInputError("Wrong Credentails", { errors });
            }
            const token = generateToken(user);
            return {
                id: user._id,
                email: user.email,
                username: user.username,
                password: user.password,
                createdAt: user.createdAt,
                token
            }
        }
    }
}