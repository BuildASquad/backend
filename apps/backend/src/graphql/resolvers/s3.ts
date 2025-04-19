const resolvers = {
    Query: {
      getPresignedUrl: async (
        _: any,
        { fileType, folder }: { fileType: string; folder?: string },
        { dataSources }: any
      ) => {
        return dataSources.s3.getPresignedUrl(fileType, folder);
      },
    },
    Mutation: {
        deleteProfilePhoto: async (
            _: any,
            { photoUrl }: { photoUrl: string },
            { dataSources }: any
        ) => {
            return dataSources.s3.deleteProfilePhoto(photoUrl);
        },
    }
  };
  export default resolvers;