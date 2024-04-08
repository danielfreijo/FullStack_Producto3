const mongoose = require('mongoose');

// Conexión a la base de datos
const URI = "mongodb+srv://cespigol:VYbSdNxX9kD1BFD5@fullstack.mfvrneg.mongodb.net/";
const connectDB = mongoose.connect(URI)
    .then(() => {
        console.log('Conectado a MongoDB');

    }).catch(error => {
        console.error('error al conectar con MongoDB', error.message);
    })

module.exports = { connectDB };