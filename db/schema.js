const { gql } = require('apollo-server');

const typeDefs = gql`

    type Curso {
        titulo: String,
        tecnologia: String,
    }

    type Tecnologia {
        nombre: String,
        version: String,
    }

    type Token {
        token: String
    }

    type Proyecto {
        nombre: String
        id: ID
    }

    type Query {
        obtenerCursos: [Curso]

        obtenerTecnologia: [Tecnologia]
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
    }
`;

// Permite exportarlo para otro archivo
module.exports = typeDefs;