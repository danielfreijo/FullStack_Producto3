const mongoose = require('mongoose');

// Conexión a la base de datos
const connection = async () => {
    const url = 'mongodb+srv://dfreijo:root@fullstack.jrtitnm.mongodb.net/';

    try {
        await mongoose.connect(url);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error(`Error al conectar a la base de datos ${error}`);
    }
};

module.exports = { connection };
