const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
// ------------------------------------------------------------------------
const mongoose = require('mongoose');

// --------------------------------------------------------------------------
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
// --------------------------------------------------------------------------

async function main() {
  const uri = "mongodb+srv://cespigol:VYbSdNxX9kD1BFD5@fullstack.mfvrneg.mongodb.net/";
  try {
    mongoose.connect(uri);
    console.log("Connected to MongoDB server");

    // Iniciamos la aplicación Express
    const app = express(); 
    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());

    // Iniciamos Apollo Server
 
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    // Redirigir las solicitudes a /graphql al archivo index.html
    app.get('/graphql', (req, res) => {
      res.sendFile(path.join(__dirname, 'front/html/index.html'));
    });

    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });

  }  catch (err) {
    console.error(err);
  };
};

main().catch(console.err);


// Ejecútalo con:
// node server.js