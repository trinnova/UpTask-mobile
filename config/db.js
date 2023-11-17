const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });

        console.log('Conexión exitosa a la DB');
    } catch (e) {
        console.log('Hubo un error');
        console.log(e);
        process.exit(1); // Deneter la app
    }
}

module.exports = conectarDB;