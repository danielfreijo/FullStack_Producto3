const { gql } = require('apollo-server-express');
const { TaskModel } = require('../models/task');

const taskTypeDefs = gql`

    type Task {
        id: ID!
        project_id: ID!
        title: String!
        description: String!
        responsible: [String]
        enddate: String!
        notes: String
        status: String
    }

    input TaskInput {
        project_id: ID!
        title: String!
        description: String!
        responsible: [String]
        enddate: String!
        notes: String
        status: String
    }

    type Query {
        getTasks: [Task]
        getTask(id: ID!): Task
    }       

    type Mutation {
        createTask(input: TaskInput!): Task
        updateTask(id: ID!, input: TaskInput!): Task
        deleteTask(id: ID!): String
    }
`;
const taskResolvers = { 
    Query: {
        getTasks: async () => {
            return await TaskModel.find({});
        },
        getTask: async (_, { id }) => {
            return await TaskModel
                .findById(id)
                .populate('project_id');    
        }
    },

    Mutation: { 
        createTask: async (_, { input }) => {
            if (input.title.trim() === '' || input.description.trim() === '') {
                throw new Error('Este campo de la tarea no puede estar vacío.');
            }
            try {
                const newTask = new TaskModel({ ...input });
                return await newTask.save();
            } catch (error) {
                throw new Error('Error al crear la tarea.');
            }
        },
        updateTask: async (_, { id, input }) => {
            if (input.title.trim() === '' || input.description.trim() === '' || input.enddate.trim() === '') {
                throw new Error('Este campo de la tarea no puede estar vacío.');
            }
            try {
                return await TaskModel.findByIdAndUpdate(id, input, { new: true });
            } catch (error) {
                throw new Error('Error al actualizar la tarea.');
            }
        },
        deleteTask: async (_, { id }) => {
            try {
                await TaskModel.findByIdAndDelete(id);
                return 'Tarea eliminada correctamente.';
            } catch (error) {
                throw new Error('Error al eliminar la tarea.');
            }
        }
    }   
};

module.exports = { taskTypeDefs, taskResolvers };