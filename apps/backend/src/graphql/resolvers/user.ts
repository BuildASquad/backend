const resolvers = {
  Query: {
    users: async (_: any, __: any, { dataSources }:any) => {
      return dataSources.user.getUsers();
    },
    user: async (_: any, { id }: { id: string }, { dataSources }:any) => {
      return dataSources.user.getUserById(id);
    },
  },
  Mutation: {
    updateUserPhoto: async (
      _: any,
      { userId, photoUrl }: { userId: string; photoUrl: string },
      { dataSources }: any
    ) => {
      return dataSources.user.updateUserPhoto(userId, photoUrl);
    },
    deletePhoto: async (
      _: any,
      { userId }: { userId: string },
      { dataSources }: any
    ) => {
      const user = await dataSources.user.getUserById(userId);
      
      if (user.photo) {
        await dataSources.s3.deleteProfilePhoto(user.photo);
      }
      
      return dataSources.user.deletePhoto(userId);
    }
  }
};

export default resolvers;