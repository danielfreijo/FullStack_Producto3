const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Subject {
    id: ID!
    nombre: String!
    pass: String!
    active: Int
    Perfil: String!
    Responsabilidades: String
    Desafios: String
  }

  type Query {
    subjects: [Subject!]!
    subject(id: ID!): Subject
  }

  type Mutation {
    createSubject(input: SubjectInput!): Subject!
    updateSubject(id: ID!, input: SubjectInput!): Subject!
    deleteSubject(id: ID!): Subject!
  }

  input SubjectInput {
    nombre: String!
    pass: String!
    active: String!
    Perfil: String
    Responsabilidades: String
    Desafios: String
  }
`;

module.exports = typeDefs;
