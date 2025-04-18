// In /graphql/resolvers/s3.ts
const resolvers = {
    Query: {
      getPresignedUrl: async (
        _: any,
        { fileType, folder }: { fileType: string; folder?: string },
        { dataSources }: any
      ) => {
        // Change this line from s3API to s3
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