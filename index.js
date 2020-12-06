const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./graphql/typedef");
const resolvers = require("./graphql/resolvers");
const pubSub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubSub })
})

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        return server.listen({ port: process.env.PORT })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    }).catch(err => console.log(err.message))