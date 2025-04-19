// /graphql/schema/s3.schema.ts
import gql from 'graphql-tag';

export const s3Schema = gql`
  type PresignedUrlResult {
    upload_url: String!
    file_url: String!
  }

  extend type Query {
    getPresignedUrl(fileType: String!, folder: String): PresignedUrlResult!
  }

  extend type Mutation {
    deleteProfilePhoto(photoUrl: String!): Boolean!
  }
`;
