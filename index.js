const { ApolloServer } = require('apollo-server');

// Importando los schemas
const typeDefs = require('./db/schema');

const resolvers = require('./db/resolvers');

const server = new ApolloServer( {typeDefs, resolvers} );

server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL: ${url}`);
});