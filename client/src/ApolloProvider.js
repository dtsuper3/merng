import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client";

const httpLink = createHttpLink({
    uri: "http://localhost:3002"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)