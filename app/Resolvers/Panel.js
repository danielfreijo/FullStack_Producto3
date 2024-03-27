const Project = require('./models/Projects');

const resolvers = {
  Query: {
    subjects: async () => {
      try {
        return await Project.find();
      } catch (error) {
        throw new Error('Error al obtener los temas');
      }
    },
    subject: async (_, { id }) => {
      try {
        return await Project.findById(id);
      } catch (error) {
        throw new Error('Error al obtener el tema');
      }
    },
  },
  Mutation: {
    createSubject: async (_, { input }) => {
      try {
        const project = new Project(input);
        await project.save();
        return project;
      } catch (error) {
        throw new Error('Error al crear el tema');
      }
    },
    updateSubject: async (_, { id, input }) => {
      try {
        const project = await Project.findByIdAndUpdate(id, input, { new: true });
        return project;
      } catch (error) {
        throw new Error('Error al actualizar el tema');
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        const project = await Project.findByIdAndDelete(id);
        return project;
      } catch (error) {
        throw new Error('Error al eliminar el tema');
      }
    },
  },
};

module.exports = resolvers;