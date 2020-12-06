module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {}
    if (username.trim().length === 0) {
        errors.username = "Username must not be empty";
    }
    if (email.trim().length === 0) {
        errors.email = "Email must not be empty";
    } else {
        const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(emailRegx)) {
            errors.email = "Email must be a valid email address";
        }
    }
    if (password.length === 0) {
        errors.password = "Password must not emplty";
    }
    else if (password !== confirmPassword) {
        errors.password = "Password must match";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim().length === 0) {
        errors.username = "Username must not be empty";
    }
    if (password.trim().length === 0) {
        errors.password = "Password must not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}