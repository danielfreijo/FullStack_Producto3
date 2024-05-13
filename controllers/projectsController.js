const { gql } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { PubSub } = require("graphql-subscriptions");

const Project = require('../models/project');
const pubsub = new PubSub();

const projectTypeDefs = gql`

    type Project {
        id: ID!
        name: String!
        description: String!
        department: String
        backgroundcolor: String
        backgroundimage: String
        backgroundcolorcard: String
        backgroundcard: String
        priority: Boolean
        dateaccess: String
    }

    input ProjectInput {
        name: String
        description: String
        department: String
        backgroundcolor: String
        backgroundimage: String
        backgroundcolorcard: String
        backgroundcard: String
        priority: Boolean
        dateaccess: String
    }

    type Query {
        getProjects: [Project]
        getProject(id: ID!): Project
    }

    type Mutation {
        createProject(input: ProjectInput!): Project
        updateProject(id: ID!, input: ProjectInput!): Project
        deleteProject(id: ID!): String
    }

    type Subscription {
        newMessage: String
      }
      
`;

const projectResolvers = {
    Query: {
        getProjects: async () => {
            return await Project.find({});
        },
        getProject: async (_, { id }) => {
            return await Project.findById(id);
        },
    },
    
    Mutation: {
        createProject: async (_, { input }, { pubsub } ) => {
            if (input.name.trim() === '' || input.description.trim() === '') {
                throw new Error('Este campo del proyecto no puede estar vacío.');
            }
            try {
                console.log("entrada de datos", input);
                const newProject = new Project({ ...input });
                await newProject.save();
                ///////////////////////
                pubsub.publish("PROJECT_CREATED", newProject );
                return newProject;
            } catch (error) {
                console.log("entrada de datos", input);
                throw new Error('Error al crear el proyecto: ' + error.message);
                
            }
        },

        updateProject: async (_, { id, input }, { pubsub } ) => {
            try {
                console.log ("2.......................");
                pubsub.publish("PROJECT_UPDATED", "Proyecto actualizado");
                return await Project.findByIdAndUpdate(id, {...input }, { new: true });
            }catch (error) {
                throw new Error('Error al actualizar el proyecto: ' + error.message);
            }
        },

        deleteProject: async (_, { id }, { pubsub } ) => {
            try{
                await Project.findByIdAndDelete(id);
                console.log (id+".......................");
                pubsub.publish("PROJECT_DELETED", {
                    deleteProject: id,
                });
                return 'Proyecto eliminado correctamente.';
            }catch (error) {
                throw new Error('Error al eliminar el proyecto: ' + error.message);
            }
        },
    },
    Subscription: {
        createProject: {
            async subscribe (_, __, { pubsub } ){
                return pubsub.asyncIterator("PROJECT_CREATED")
            }
        },
        updateProject: {
            async subscribe (_, __, { pubsub } ){
                return pubsub.asyncIterator("PROJECT_UPDATED")
            }
        },
        deleteProject: {
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

module.exports = { projectTypeDefs, projectResolvers };