const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

    type Curso {
        titulo: String,
        teconologia: String
    }

    type Query {
        obtenerCursos: [Curso]
    }
`;

const cursos = [
    {
        titulo: 'JS',
        tecnologia: 'JS ECMA-E',
    },

    {
        titulo: 'React',
        tecnologia: 'React Native',
    },

    {
        titulo: 'Node',
        tecnologia: 'Node.js',
    },

    {
        titulo: 'React Avanzado',
        tecnologia: 'React Native, Apollo, GraphQL',
    },
]

// Resolver: son funciones que son responsables de retornar los valores que existen en los 
const resolvers = {
    Query: {
        obtenerCursos: () => cursos
    }
}

const server = new ApolloServer( {typeDefs, resolvers} );

server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL: ${url}`);
});