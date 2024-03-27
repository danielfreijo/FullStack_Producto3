// Importar los módulos necesarios
const express = require('express');
const router = express.Router();
const Subject = require('../models/Users');

// Definir una ruta para el panel
router.get('/Users', async (req, res) => {
    try {
        // Obtener los datos del panel desde la base de datos o cualquier otra fuente de datos
        const subjects = await Subject.find().exec();

        // Renderizar el panel con los datos obtenidos
        res.render('panel', { subjects });
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al obtener los datos del panel:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Exportar el router para su uso en la aplicación principal
module.exports = router;