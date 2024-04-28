const { gql } = require('apollo-server-express');
const task = require('../models/task');

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
        createTask: async (_, { input }, { io })  => {
            if (input.title.trim() === '' || input.description.trim() === '') {
                throw new Error('Este campo de la tarea no puede estar vacío.');
            }
            try {
                const newTask = new task({ ...input });
                const savedTask = await newTask.save();
                io.emit('taskCreated', savedTask);
                console.log("nueva tarea CONTROLLER", savedTask);
                return savedTask;
            } catch (error) {
                console.log(error);
                //console.log("entrado en el catch");
                throw new Error('Error al crear la tarea.');
            }
        },

        updateTask: async (_, { id, input }, { io }) => {
            try {
                const updatedTask =  await task.findByIdAndUpdate(id, input, { new: true });
                io.emit('taskUpdated', updatedTask);
                console.log("tarea actualizada CONTROLLER", updatedTask);
                return updatedTask;
            } catch (error) {
                throw new Error('Error al actualizar la tarea.');
            }
        },

        deleteTask: async (_, { id }, { io }) => {
            try {
                const deletedTask = await task.findByIdAndDelete(id);
                if (deletedTask) {
                    io.emit('taskDeleted', { id });
                    console.log("tarea eliminada CONTROLLER", id);
                    return 'Tarea eliminada correctamente.';
                } else {
                    throw new Error('Error al eliminar la tarea.');
                }
            } catch (error) {
                throw new Error('Error al eliminar la tarea.');
            }
        }
    }   
};

module.exports = { taskTypeDefs, taskResolvers };