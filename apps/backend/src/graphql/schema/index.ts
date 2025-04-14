import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import exampleDefs from './example';

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
typeDefs.push(rootDefs, exampleDefs);

export default typeDefs;
