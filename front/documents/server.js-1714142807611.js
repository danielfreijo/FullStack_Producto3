const express = require('express');
const http = require('http');
const path = require('path');
const { ApolloServer} = require('apollo-server-express');
const { projectTypeDefs, projectResolvers } = require('./controllers/projectsController');
const { taskTypeDefs, taskResolvers } = require('./controllers/tasksController');
const { connection} = require('./config/connectionDB');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'front/documents') // Cambia 'uploads/' a 'front/documents'
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer);
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
  httpServer.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    //console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`)
  );
}
// Mensajes de socket.io
io.on('connection', (socket) => { 
  console.log('Usuario conectado, mensaje por socket.io');
  socket.on('taskCreated', (data) => {
    console.log(data.message);
  });
  socket.on('taskUpdated', (data) => {
    console.log(data.message);
  });
  

  socket.on('disconnect', () => {
    console.log('Usuario desconectado, mensaje por socket.io');
  });
});



app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'Archivo subido con éxito.' });
});


startServer();
