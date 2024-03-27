const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// ------------------------------------------------------------------------
const mongoose = require('mongoose');
const Panel = require('./models/Panel');
const Tasks = require('./models/Tasks');
const Users = require('./models/Users');
// ------------------------------------------------------------------------
const typeDefs = require('./schema'); // Importa el esquema GraphQL
const resolvers = require('./resolvers'); // Importa los resolvers GraphQL

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor GraphQL en funcionamiento en http://localhost:${PORT}${server.graphqlPath}`);
});

// Ejecútalo con node server.js