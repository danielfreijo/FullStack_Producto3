const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Subject {
    id: ID!
    project_id: Int
    userassigned: String!
    nametask: String!
    descriptiontask: String!
    notes: String
    startdate: String
    enddate: String
    status: String
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
    project_id: Int
    userassigned: String!
    nametask: String!
    descriptiontask: String!
    notes: String
    startdate: String
    enddate: String
    status: String
  }
`;

module.exports = typeDefs;
