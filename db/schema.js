const { gql } = require('apollo-server');

const typeDefs = gql`

    type Curso {
        titulo: String,
        tecnologia: String,
    },

    type Tecnologia {
        nombre: String,
        version: String,
    },

    type Query {
        obtenerCursos: [Curso]

        obtenerTecnologia: [Tecnologia]
    }

    type Mutation {
        crearUsuario: String
    }
`;

// Permite exportarlo para otro archivo
module.exports = typeDefs;