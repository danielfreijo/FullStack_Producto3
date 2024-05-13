const { gql } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { PubSub } = require("graphql-subscriptions");

const task = require('../models/task');
const pubsub = new PubSub();

const taskTypeDefs = gql`

    type Task {
        id: ID!
        project_id: ID!
        title: String!
        description: String!
        responsible: [String]
        enddate: String!
        ended: Boolean
        notes: String
        status: String
    }

    input TaskInput {
        project_id: ID
        title: String
        description: String
        responsible: [String]
        enddate: String
        ended: Boolean
        notes: String
        status: String
    }

    type Query {
        getTasksByProjectId(projectId: ID!): [Task]
        getTask(id: ID!): Task
    }       

    type Mutation {
        createTask(input: TaskInput!): Task
        updateTask(id: ID!, input: TaskInput!): Task
        deleteTask(id: ID!): String
    }

    type Subscription {
        newMessage: String
      }

`;
const taskResolvers = { 
    Query: {
        getTasksByProjectId: async (_, { projectId }) => {
            return await task.find({ project_id: projectId});
        },
        getTask: async (_, { id }) => {
            return await task
                .findById(id)
                .populate('project_id');    
        }
    },

    Mutation: { 
        createTask: async (_, { input }, { pubsub }) => {
            if (input.title.trim() === '' || input.description.trim() === '') {
                throw new Error('Este campo de la tarea no puede estar vacío.');
            }
            try {
                const newTask = new task({ ...input });
                return await newTask.save();
            } catch (error) {
                console.log(error);
                throw new Error('Error al crear la tarea.');
            }
        },
        updateTask: async (_, { id, input }, { pubsub }) => {
            try {
                return await task.findByIdAndUpdate(id, input, { new: true });
            } catch (error) {
                throw new Error('Error al actualizar la tarea.');
            }
        },
        deleteTask: async (_, { id }, { pubsub }) => {
            try {
                await task.findByIdAndDelete(id);
                return 'Tarea eliminada correctamente.';
            } catch (error) {
                throw new Error('Error al eliminar la tarea.');
            }
        },
    }, 
    Subscription: {
        createTask: {
            async subscribe (_, __, { pubsub } ){
                return pubsub.asyncIterator("PROJECT_CREATED")

            }
        },
        updateTask: {
            async subscribe (_, __, { pubsub } ){
                return pubsub.asyncIterator("PROJECT_UPDATED")

            }
        },
        deleteTask: {
            async subscribe (_, __, { pubsub} ){
                return pubsub.asyncIterator("PROJECT_DELETED")

            }
        },
        newmessage: {
            async subscribe (_, __, { pubsub} ){
                return pubsub.asyncIterator("NEW_MESSAGE")
            }
        },
      },
};

module.exports = { taskTypeDefs, taskResolvers };