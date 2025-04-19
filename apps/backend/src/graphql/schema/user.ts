import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    first_name: String!
    last_name: String
    photo: String
    created_at: String
    updated_at: String
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User!
  }
     
  extend type Mutation {
    updateUserPhoto(userId: ID!, photoUrl: String!): User!
    deletePhoto(userId: ID!): User!
  }
`;

export default typeDefs;