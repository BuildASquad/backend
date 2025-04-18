import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    first_name: String!
    email: String!
  }

  extend type Query {
    getUsers: [User!]!
  }
`;

export default typeDefs;
