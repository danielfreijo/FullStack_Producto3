const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// ------------------------------------------------------------------------
const mongoose = require('mongoose');
const Panel = require('./models/Panel');
const Tasks = require('./models/Task');
const Users = require('./models/Users');
// ------------------------------------------------------------------------
//const typeDefs = require('./Schema'); // Importa el esquema GraphQL
//const resolvers = require('./Resolvers'); // Importa los resolvers GraphQL

const bodyParser = require('body-parser');
const app = express();

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb+srv://cespigol:VYbSdNxX9kD1BFD5@fullstack.mfvrneg.mongodb.net/')
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Middleware para analizar solicitudes JSON
app.use(express.json());
// Ruta para manejar la solicitud POST a /api/create
app.post('/api/create', (req, res) => {
    // Aquí puedes agregar la lógica para manejar la solicitud
    // Por ejemplo, puedes guardar los datos recibidos en una base de datos
  
    // Envía una respuesta de ejemplo
    res.status(200).json({ message: 'Solicitud POST recibida en /api/create' });
  });

// Iniciar el servidor
//const PORT = 3000;
//app.listen(PORT, () => {
//  console.log(`Servidor escuchando en el puerto ${PORT}`);
//});

// Ejecútalo con:
// node server.js