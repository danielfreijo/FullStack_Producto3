const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const { ApolloServer} = require('apollo-server-express');
const { projectTypeDefs, projectResolvers } = require('./controllers/projectsController');
const { taskTypeDefs, taskResolvers } = require('./controllers/tasksController');
const { connection} = require('./config/connectionDB');

const app = express();
connection();

const publicPath = path.join(__dirname, "front");

app.use(express.static(path.join( publicPath )));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const server = http.createServer(app);
const io = new Server(server);

// Manejo de conexiones de socket.io
io.on("connection", (socket) => {
  console.log("Usuario conectado");
  // Maneja el evento 'mensaje' enviado por el cliente
  socket.on('mensaje', (mensaje) => {
    console.log('Mensaje recibido:', mensaje);
    // Emitir el mensaje a todos los clientes conectados
    io.emit('mensaje', mensaje);
  });
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
    },
    context: ({ req }) => ({ io }) // Pasando el objeto io al contexto de Apollo
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api'});

  app.use((req, res, next) => {
    res.status(404).send('Error 404');
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    //console.log(Servidor corriendo en http://localhost:${PORT}${server.graphqlPath})
  );
}

startServer();




/*const express = require('express');
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

*/