const Users = require('./models/Users');

const resolvers = {
  Query: {
    subjects: async () => {
      try {
        return await Users.find();
      } catch (error) {
        throw new Error('Error al obtener los temas');
      }
    },
    subject: async (_, { id }) => {
      try {
        return await Users.findById(id);
      } catch (error) {
        throw new Error('Error al obtener el tema');
      }
    },
  },
  Mutation: {
    createSubject: async (_, { input }) => {
      try {
        const user = new Project(input);
        await user.save();
        return user;
      } catch (error) {
        throw new Error('Error al crear el tema');
      }
    },
    updateSubject: async (_, { id, input }) => {
      try {
        const user = await Users.findByIdAndUpdate(id, input, { new: true });
        return user;
      } catch (error) {
        throw new Error('Error al actualizar el tema');
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        const user = await Users.findByIdAndDelete(id);
        return user;
      } catch (error) {
        throw new Error('Error al eliminar el tema');
      }
    },
  },
};

module.exports = resolvers;