const { gql } = require('apollo-server-express');
const Project = require('../models/project');

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
        createProject: async (_, { input }, { io }) => {
            if (input.name.trim() === '' || input.description.trim() === '') {
                throw new Error('Este campo del proyecto no puede estar vacío.');
            }
            try {
                const newProject = new Project({ ...input });
                const savedProject = await newProject.save();
                io.emit('projectAdded', savedProject);
                console.log("Proyecto creado y emitido CONTROLLER:", savedProject);
                return savedProject;
            } catch (error) {
                throw new Error('Error al crear el proyecto: ' + error.message);
            }
        },

        updateProject: async (_, { id, input }, { io }) => {
            try {
                const updatedProject = await Project.findByIdAndUpdate(id, {...input }, { new: true });
                io.emit('projectUpdated', updatedProject);  
                console.log("Proyecto actualizado y emitido CONTROLLER:", updatedProject);
                return updatedProject;
            }catch (error) {
                throw new Error('Error al actualizar el proyecto: ' + error.message);
            }
        },

        deleteProject: async (_, { id }, { io }) => {
            try{
                const deletedProject = await Project.findByIdAndDelete(id);
                if (deletedProject) {
                    io.emit('projectDeleted', { id });
                    console.log("Proyecto eliminado y emitido CONTROLLER:", id);
                    return 'Proyecto eliminado correctamente.';
                } else {
                    throw new Error('El proyecto no existe.');
                } 
            }catch (error) {
                throw new Error('Error al eliminar el proyecto: ' + error.message);
            }
        },
    },
};

module.exports = { projectTypeDefs, projectResolvers };
