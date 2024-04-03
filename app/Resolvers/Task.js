const Task = require('./models/Task');

const resolvers = {
  Query: {
    subjects: async () => {
      try {
        return await Task.find();
      } catch (error) {
        throw new Error('Error al obtener las tareas');
      }
    },
    subject: async (_, { id }) => {
      try {
        return await Task.findById(id);
      } catch (error) {
        throw new Error('Error al obtener la tarea');
      }
    },
  },
  Mutation: {
    createSubject: async (_, { input }) => {
      try {
        const task = new Task(input);
        await task.save();
        return task;
      } catch (error) {
        throw new Error('Error al crear la tarea');
      }
    },
    updateSubject: async (_, { id, input }) => {
      try {
        const task = await Task.findByIdAndUpdate(id, input, { new: true });
        return task;
      } catch (error) {
        throw new Error('Error al actualizar la tarea');
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        const task = await Task.findByIdAndDelete(id);
        return task;
      } catch (error) {
        throw new Error('Error al eliminar la tarea');
      }
    },
  },
};

module.exports = resolvers;