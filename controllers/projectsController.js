const { gql } = require('apollo-server-express');
const { ProjectModel } = require('../models/project');

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
        dateAccess: String
    }

    input ProjectInput {
        name: String!
        description: String!
        department: String
        backgroundcolor: String
        backgroundimage: String
        backgroundcolorcard: String
        backgroundcard: String
        priority: Boolean
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
`;

const projectResolvers = {
    Query: {
        getProjects: async () => {
            return await ProjectModel.find({});
        },
        getProject: async (_, { id }) => {
            return await ProjectModel.findById(id);
        },
    },
    
    Mutation: {
        createProject: async (_, { input }) => {
            if (input.name.trim() === '' || input.description.trim() === '') {
                throw new Error('Este campo del proyecto no puede estar vacío.');
            }
            try {
                const newProject = new ProjectModel({ ...input });
                return await newProject.save();
            } catch (error) {
                throw new Error('Error al crear el proyecto: ' + error.message);
            }
        },

        updateProject: async (_, { id, input }) => {
            if (input.name.trim() === '' || input.description.trim() === '') {
                throw new Error('Este campo del proyecto no puede estar vacío.');
            }
            try {
                return await ProjectModel.findByIdAndUpdate(id, {...input }, { new: true });
            }catch (error) {
                throw new Error('Error al actualizar el proyecto: ' + error.message);
            }
        },

        deleteProject: async (_, { id }) => {
            try{
                await ProjectModel.findByIdAndDelete(id);
                return 'Proyecto eliminado correctamente.';
            }catch (error) {
                throw new Error('Error al eliminar el proyecto: ' + error.message);
            }
        },
    },
};

module.exports = { projectTypeDefs, projectResolvers };
