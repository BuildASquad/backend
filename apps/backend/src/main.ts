import express from 'express';
import { connectMongoDB } from '@db';
import routes from './routes';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import UserDataSource from './graphql/datasources/example';
import { ApolloContext } from './graphql/types';

const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  connectMongoDB();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  const dataSource = {
    user: new UserDataSource(),
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const apolloServer = new ApolloServer<ApolloContext>({
    schema,
  });

  await apolloServer.start();
  app.use('/graphql', expressMiddleware(apolloServer, {
    context: async ({ req }) => ({ dataSources: dataSource, req }),
  }));

  app.use(routes);

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
  });
}

// Call the function to start the server
(async () => {
  await startServer();
})();
