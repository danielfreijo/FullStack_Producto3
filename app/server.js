const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Definiciones de esquema y resolvers
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hola, mundo!',
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();