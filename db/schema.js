const { gql } = require('apollo-server');

const typeDefs = gql`
    type Token {
        token: String
    }

    type Proyecto {
        nombre: String
        id: ID
    }

    type Query {
        obtenerProyectos : [Proyecto]
    }

    input UsuarioInput {
        nombre: String! # ! indica que es un campo obligatorio
        email: String!
        password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    input ProyectoInput {
        nombre: String!
    }

    type Mutation {
        crearUsuario(input: UsuarioInput) : String

        autenticarUsuario(input: AutenticarInput) : Token

        nuevoProyecto(input: ProyectoInput) : Proyecto

        actualizarProyecto(id : ID!, input: ProyectoInput) : Proyecto

        eliminarProyecto(id: ID!) : String
    }
`;

// Permite exportarlo para otro archivo
module.exports = typeDefs;