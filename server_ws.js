const express = require('express');
const path = require('path');
const http = require('http');
// -------------------------------------------------------------
const { ApolloServer, gql } = require('apollo-server-express');
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

// Define tu esquema de GraphQL y resolvers
const typeDefs = `
  type Query {
    hello: String
  }
  type Subscription {
    newMessage: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(['NEW_MESSAGE']),
    },
  },
};

// Crea una instancia de PubSub
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
    context: ({ req }) => ({ io, pubsub }) // Pasando el objeto req al contexto de Apollo
  });
  
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api'});



// Crear una instancia de PubSub para manejar las suscripciones
const pubsub = new PubSub();

// Manejar las conexiones de Socket.IO
// Crea una instancia de Socket.IO y maneja las conexiones
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  
  // Maneja los eventos de suscripción GraphQL
  socket.on('subscribe', ({ query }) => {
    console.log('Subscribe event received');
    
    // Ejecuta la consulta GraphQL y suscríbete al resultado
    execute(schema, query).then((result) => {
      if (result.errors) {
        console.error('Error executing GraphQL query:', result.errors);
        return;
      }
      
      const observable = subscribe(schema, result.query);
      observable.subscribe({
        next: (data) => {
          console.log('Subscription data:', data);
          socket.emit('subscriptionData', data);
        },
        error: (err) => {
          console.error('Error with subscription:', err);
        },
      });
    });
  });
});


  const PORT = process.env.PORT || 4000;

  server.listen(PORT, () =>{
    console.log(`🚀 Server ready at http://localhost:${PORT}`)

    console.log(`🚀 Subscriptions ready at http://localhost:${PORT}/api`)
  });

    // =====================================================

    app.use((req, res, next) => {
      res.status(404).send('Error 404');
    });
  

}

startServer();
