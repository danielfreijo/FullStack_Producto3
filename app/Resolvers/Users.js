const Users = require('./models/Users');

const resolvers = {
  Query: {
    subjects: async () => {
      try {
        return await Users.find();
      } catch (error) {
        throw new Error('Error al obtener el usuario');
      }
    },
    subject: async (_, { id }) => {
      try {
        return await Users.findById(id);
      } catch (error) {
        throw new Error('Error al obtener el usuario');
      }
    },
  },
  Mutation: {
    createSubject: async (_, { input }) => {
      try {
        const user = new Users(input);
        await user.save();
        return user;
      } catch (error) {
        throw new Error('Error al crear el usuario');
      }
    },
    updateSubject: async (_, { id, input }) => {
      try {
        const user = await Users.findByIdAndUpdate(id, input, { new: true });
        return user;
      } catch (error) {
        throw new Error('Error al actualizar el usuario');
      }
    },
    deleteSubject: async (_, { id }) => {
      try {
        const user = await Users.findByIdAndDelete(id);
        return user;
      } catch (error) {
        throw new Error('Error al eliminar el usuario');
      }
    },
  },
};

module.exports = resolvers;