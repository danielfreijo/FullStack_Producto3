const express = require('express');
const path = require('path');
const { ApolloServer} = require('apollo-server-express');
const { projectTypeDefs, projectResolvers } = require('./controllers/projectsController');
const { taskTypeDefs, taskResolvers } = require('./controllers/tasksController');
const { connection} = require('./config/connectionDB');
const multer = require ('multer');
const logger = require ('morgan');
const socketIO = require('socket.io');

// Crea la aplicación Express
const app = express();
const upload = multer();
connection();

// Define el directorio público
const publicPath = path.join(__dirname, "front");

// Configura la aplicación Express para servir archivos estáticos
app.use(express.static(path.join( publicPath )));

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs: [projectTypeDefs, taskTypeDefs],
    resolvers: {
      Query: {
        ...projectResolvers.Query,
        ...taskResolvers.Query
      },
      Mutation: {
        ...projectResolvers.Mutation,
        ...taskResolvers.Mutation
      }
    }
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api' });

  // Iniciar el servidor de Socket.IO
  const httpServer = app.listen(4000, () => {
    console.log(`Servidor corriendo en http://localhost:4000`);
  });

  const io = socketIO(httpServer);

  // Maneja el evento 'connection' de Socket.IO
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Maneja el evento 'mensaje' enviado por el cliente
    socket.on('mensaje', (mensaje) => {
      console.log('Mensaje recibido:', mensaje);
      // Emitir el mensaje a todos los clientes conectados
      io.emit('mensaje', mensaje);
    });
  });

}

startServer();