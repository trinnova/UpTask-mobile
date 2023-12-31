const { gql } = require('apollo-server');

const typeDefs = gql`
    type Token {
        token: String
    }

    type Proyecto {
        nombre: String
        id: ID
    }

    # Es lo que retorna la BD
    type Tarea {
        nombre: String
        id: ID
        proyecto: String
        estado: Boolean
    }

    type Query {
        obtenerProyectos : [Proyecto]

        obtenerTareas(input: ProyectoIDInput) : [Tarea]
    }

    input ProyectoIDInput {
        proyecto: String!
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

    input TareaInput {
        nombre: String!
        proyecto: String!
    }

    type Mutation {
        # Usuarios
        crearUsuario(input: UsuarioInput) : String
        autenticarUsuario(input: AutenticarInput) : Token

        # Proyectos
        nuevoProyecto(input: ProyectoInput) : Proyecto
        actualizarProyecto(id : ID!, input: ProyectoInput) : Proyecto
        eliminarProyecto(id: ID!) : String

        # Tareas
        nuevaTarea(input: TareaInput) : Tarea
        actualizarTarea(id: ID!, input: TareaInput, estado: Boolean) : Tarea
        eliminarTarea(id: ID!) : String
    }
`;

// Permite exportarlo para otro archivo
module.exports = typeDefs;