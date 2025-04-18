const resolvers = {
  Query: {
    users: async (_: any, __: any, { dataSources }:any) => {
      return dataSources.user.getUsers();
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
      // First get the user to get the photo URL
      const users = await dataSources.user.getUsers();
      const user = users.find((u: any) => u._id.toString() === userId);
      
      if (user && user.photo) {
        // Delete the file from S3
        await dataSources.s3.deleteProfilePhoto(user.photo);
      }
      
      // Remove the photo field from the user
      return dataSources.user.deletePhoto(userId);
    }
  }
};
export default resolvers;