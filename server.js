const express = require('express');
const path = require('path');
const http = require('http');
// -------------------------------------------------------------
const { ApolloServer, gql} = require('apollo-server-express');
// -------------------------------------------------------------
const { Server } = require('socket.io');
// Nuevas líneas para subscriptions-transport-ws
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } = require('http');
const { PubSub } = require('graphql-subscriptions');
const { makeExecutableSchema } = require('@graphql-tools/schema');
// ---------------------------------------------------------------------------------
const { projectTypeDefs, projectResolvers } = require('./controllers/projectsController');
const { taskTypeDefs, taskResolvers } = require('./controllers/tasksController');
const { connection} = require('./config/connectionDB');

// -------------------------------------------------------------------------------------------
const app = express();


// --------------------------------------------------------
// Web inicial del servidor
// --------------------------------------------------------
const publicPath = path.join(__dirname, "front");

app.use(express.static(path.join( publicPath )));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// --------------------------------------------------------

const server = http.createServer(app);
const io = new Server(server);

const pubsub = new PubSub();
  
connection();


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
      },
    },
    Subscription: {
      newMessage: {
        subscribe: () => pubsub.asyncIterator('NEW_MESSAGE'),
      },
  
    },    
    context: ({ req }) => ({ io, pubsub }) // Pasando el objeto req al contexto de Apollo
  });
  
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api'});



// Crear una instancia de PubSub para manejar las suscripciones
const pubsub = new PubSub();

// Manejar las conexiones de Socket.IO
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  pubsub.publish('NEW_MESSAGE', { newMessage:'Usuario conectado a través de WebSocket'} );

  // Manejar el evento 'mensaje' enviado por el cliente
  socket.on('mensaje', (mensaje) => {
    console.log('Mensaje recibido:', mensaje);
    // Emitir el mensaje a todos los clientes conectados a través de WebSocket
    io.emit('mensaje', mensaje);

    // Publicar el mensaje como una nueva suscripción de GraphQL
    pubsub.publish('NEW_MESSAGE', { newMessage: mensaje });
  });
});

  // =====================================================

  app.use((req, res, next) => {
    res.status(404).send('Error 404');
  });

  const PORT = process.env.PORT || 4000;

  server.listen(PORT, () =>{
    console.log(`🚀 Server ready at http://localhost:${PORT}`)

    console.log(`🚀 Subscriptions ready at http://localhost:${PORT}/api`)
  });
}

startServer();
