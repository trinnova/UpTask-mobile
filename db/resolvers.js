const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

// Resolver: son funciones que son responsables de retornar los valores que existen en los 
const resolvers = {
    Query: {

    },

    Mutation: {
        crearUsuario: async (_, {input}) => {
            const { email, password } = input;

            // findOne = busca 1 registro
            const existeUsuario = await Usuario.findOne({ email });

            // Si el usuario existe
            if (existeUsuario)
            {
                throw new Error('El usuario ya esta registrado');
            }

            try
            {
                // Hashear Password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);
                console.log(input);

                const nuevoUsuario = new Usuario(input);
                console.log(nuevoUsuario);

                // Guardar en la BD
                nuevoUsuario.save();

                return "Usuario creado correctamente";
            }
            catch (error)
            {
                console.error(error);
            }
        }
    }
};

module.exports = resolvers;