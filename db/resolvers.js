const Usuario = require('../models/Usuario');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');
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
        obtenerProyectos: async (_, {}, ctx) => {
            const proyectos = await Proyecto.find( { creador: ctx.usuario.id} );

            return proyectos;
        }
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

        nuevoProyecto: async (_, {input}, ctx) => {

            try
            {
                const proyecto = new Proyecto(input);

                // Asociar el creador
                proyecto.creador = ctx.usuario.id;

                // Almacenar en la BD
                const resultado = await proyecto.save();

                return resultado;
            } 
            catch(error)
            {
                console.log(error);
            }
        },

        actualizarProyecto: async (_, { id, input}, ctx) => {
            // Revisar si el proyecto existe
            let proyecto = await Proyecto.findById(id);

            if (!proyecto)
            {
                throw new Error('Proyecto no encontrado');
            }

            // Revisar que si la persona que trata de editarlo, es el creador
            if (proyecto.creador.toString() !== ctx.usuario.id)
            {
                throw new Error('No tienes las credenciales para editar');
            }

            // Guardar el proyecto
            proyecto = await Proyecto.findOneAndUpdate({_id: id},input,{new: true});

            return proyecto;
        },

        eliminarProyecto: async (_, {id}, ctx) => {
            // Revisar si el proyecto existe
            let proyecto = await Proyecto.findById(id);

            if (!proyecto)
            {
                throw new Error('Proyecto no encontrado');
            }

            // Revisar que si la persona que trata de editarlo, es el creador
            if (proyecto.creador.toString() !== ctx.usuario.id)
            {
                throw new Error('No tienes las credenciales para editar');
            }

            // Eliminar
            await Proyecto.findOne( { _id : id} );

            return "Proyecto Eliminado";
        },

        nuevaTarea: async (_, { input }, ctx) => {
            try
            {
                const tarea = new Tarea(input);
                tarea.creador = ctx.usuario.id;
                const resultado = await tarea.save();
                return resultado;
            }
            catch(error)
            {
                console.log(error);
            }
        },

        actualizarTarea: async (_, {id, input, estado }, ctx) => {
            // Revisar si existe la tarea
            let tarea = await Tarea.findById(id);

            if (!tarea)
            {   
                throw new Error('Tarea no encontrada');
            }

            // Si la persona que edita es el creador
            if (tarea.creador.toString() !== ctx.usuario.id)
            {
                throw new Error('No tienes las credenciales para editar');
            }

            // Asignar estado
            input.estado = estado;

            // Guardar y Retornar la Tarea
            tarea = await Tarea.findByIdAndUpdate( { _id : id}, input, { new: true} );

            return tarea;
        }
    }
};

module.exports = resolvers;