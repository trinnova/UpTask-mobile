const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
require('dotenv').config('variables.env');
// Importando los schemas
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');

// Conectar a la BD
conectarDB();


const server = new ApolloServer( 
    {
        typeDefs, 
        resolvers,
        context: ( {req} ) => {
            const token = req.headers['authorization'] || '';

            if (token)
            {
                try
                {
                    const usuario = jwt.verify(token, process.env.SECRETA);
                    console.log(usuario);

                    return {
                        usuario
                    }
                }
                catch(error)
                {

                }
            }
        }
    } 
);

server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL: ${url}`);
});