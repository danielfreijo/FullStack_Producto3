const express = require('express');
const path = require('path');
const { ApolloServer} = require('apollo-server-express');
const { projectTypeDefs, projectResolvers } = require('./controllers/projectsController');
const { taskTypeDefs, taskResolvers } = require('./controllers/tasksController');
const { connection} = require('./config/connectionDB');
const socketIO = require('socket.io');
const multer = require('multer');

const app = express();
const upload = multer();
connection();

const publicPath = path.join(__dirname, "front");

app.use(express.static(path.join( publicPath )));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

async function startServer() {
  const server = new ApolloServer({
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

  await server.start();
  server.applyMiddleware({ app, path: '/api'});

  app.use((req, res, next) => {
    res.status(404).send('Error 404');
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    //console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`)
  );

  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Manejar el evento 'mensaje' enviado por el cliente
    socket.on('mensaje', (mensaje) => {
        console.log('Mensaje recibido:', mensaje);
        // Emitir el mensaje a todos los clientes conectados
        io.emit('mensaje', mensaje);
    });
  });
}




startServer();