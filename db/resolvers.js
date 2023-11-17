
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
    },

    Mutation: {
        crearUsuario: (_, {input}) => {
            console.log(input);
            console.log('Creando usuario...');
        }
    }
};

module.exports = resolvers;