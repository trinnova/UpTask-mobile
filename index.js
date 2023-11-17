const { ApolloServer, gql } = require('apollo-server');

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
];

const tecnologias = [
    {
        nombre: 'HTML',
        version: 'V5',
    },

    {
        nombre: 'CSS',
        version: 'V3',
    },

    {
        nombre: 'SASS',
        version: 'V20.1',
    },

    {
        nombre: 'BOOTSTRAP',
        version: 'V5',
    },
];

// Resolver: son funciones que son responsables de retornar los valores que existen en los 
const resolvers = {
    Query: {
        obtenerCursos: () => cursos,

        obtenerTecnologia: () => tecnologias
    }
};

const server = new ApolloServer( {typeDefs, resolvers} );

server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL: ${url}`);
});