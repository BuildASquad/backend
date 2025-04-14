const resolvers = {
  Query: {
    getUsers: async (_: any, __: any, { dataSources }) => {
      return dataSources.user.getUsers();
    },
  },
};
export default resolvers;
