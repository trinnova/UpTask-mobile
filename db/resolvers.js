const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

// Crear y firm un JWT
const crearToken = (usuario, secreta, expiresIn) => {
    console.log(usuario);
    const { id, email } = usuario;

    return jwt.sign( { id, email}, secreta, { expiresIn } );
}

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
        },

        autenticarUsuario: async (_, {input}) => {
            const { email, password } = input;

            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });

            // Si el usuario existe
            if (!existeUsuario)
            {
                throw new Error('El usuario no existe');
            }

            // Si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
        
            if (!passwordCorrecto)
            {   
                throw new Error('El Password es incorrecto');
            }

            // Dar acceso a la app
            return {
                token: crearToken(existeUsuario, process.env.SECRETA,'2hr')
            }
        },

        nuevoProyecto: async (_, {input}) => {
            console.log('creando proyecto');
        }
    }
};

module.exports = resolvers;