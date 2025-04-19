import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import userDefs from './user';
import { s3Schema } from './s3';

const rootDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

const typeDefs: DocumentNode[] = [];
typeDefs.push(rootDefs, userDefs, s3Schema);

export default typeDefs;
