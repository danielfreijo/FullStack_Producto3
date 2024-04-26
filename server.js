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

  // Añadir el evento projectAdded
  socket.on("projectAdded", (newProject) => {
    console.log("Nuevo proyecto recibido vía Socket.io", newProject);
    socket.broadcast.emit("updateProjects", newProject);
  });

  // Añadir el evento projectUpdated
  socket.on("projectUpdated", (updatedProject) => {
    console.log("Proyecto actualizado recibido vía Socket.io", updatedProject);
    socket.broadcast.emit("updateProject", updatedProject);  // Avisa a todos excepto al emisor
  });

  // Añadir el evento projectDeleted
  socket.on("projectDeleted", (projectId) => {
    console.log("Proyecto eliminado recibido vía Socket.io", projectId);
    socket.broadcast.emit("deletedProject", projectId);  // Avisa a todos excepto al emisor
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
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
    //console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();