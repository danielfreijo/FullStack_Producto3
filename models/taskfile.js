const mongoose = require('mongoose');

const tarjetaSchema = new mongoose.Schema({
    id: { type: String, required: true },
    id_tarea: { type: String, required: true },
    archivo: { type: Buffer, required: true },
});

const Tarjeta = mongoose.model('Tarjeta', tarjetaSchema);

module.exports = Tarjeta;