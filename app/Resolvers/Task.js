const Task = require('./models/Task');

const resolvers = {
  Query: {
    subjects: async () => {
      try {
        return await Task.find();
      } catch (error) {
        throw new Error('Error al obtener los temas');
      }
    },
    subject: async (_, { id }) => {
      try {
        return await Task.findById(id);
      } catch (error) {
        throw new Error('Error al obtener el tema');
      }
    },
  },
  Mutation: {
    createSubject: async (_, { input }) => {
      try {
        const task = new Project(input);
        await task.save();
        return task;
      } catch (error) {
        throw new Error('Error al crear el tema');
      }
    },
    updateSubject: async (_, { id, input }) => {
      try {
        const task = await Task.findByIdAndUpdate(id, input, { new: true });
        return task;
      } catch (error) {
        throw new Error('Error al actualizar el tema');
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        const task = await Task.findByIdAndDelete(id);
        return task;
      } catch (error) {
        throw new Error('Error al eliminar el tema');
      }
    },
  },
};

module.exports = resolvers;