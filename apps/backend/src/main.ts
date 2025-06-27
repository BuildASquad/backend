import dotenv from 'dotenv';
dotenv.config(); // FIX #1: load env vars before you use process.env

import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import { connectMongoDB } from '@db';
import routes from './routes';
import { setupPassport } from './config/passport';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { ApolloContext } from './graphql/types';
import { getCurrentUserFromReq } from './graphql/auth';

import UserDataSource from './graphql/datasources/user';
import S3DataSource from './graphql/datasources/s3';
import PostDataSource from './graphql/datasources/post';
import SavedPostDataSource from './graphql/datasources/saved-post';
import ApplicationDataSource from './graphql/datasources/apply';
import ProfileDataSource from './graphql/datasources/profile';
import ConnectionDataSource from './graphql/datasources/connection';
import PeopleDataSource from './graphql/datasources/people';
import ChatDataSource from './graphql/datasources/chat';
import { initSocket } from '@socket';

const HOST = process.env.HOST ?? 'localhost';
const PORT = parseInt(process.env.PORT ?? '3000', 10);
const CLIENT_ORIGIN = process.env.FRONTEND_URL!;
const SESSION_SECRET = process.env.SESSION_SECRET!;

// sanity-check
if (!SESSION_SECRET) {
  console.error('❌ SESSION_SECRET is required');
  process.exit(1);
}

async function startServer() {
  const app = express();

  try {
    // 1) Connect to DB
    await connectMongoDB();

    // 2) Standard middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    // 3) CORS with credentials
    app.use(
      cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
      })
    );

    // 4) Session + Passport
    app.use(
      session({
        secret: SESSION_SECRET, // FIX #2: needed for passport sessions
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
      })
    );
    setupPassport(); // FIX #3: setup passport strategies
    app.use(passport.initialize());
    app.use(passport.session());

    // 5) GraphQL
    const dataSources = {
      user: new UserDataSource(),
      s3: new S3DataSource(),
      post: new PostDataSource(),
      savedPost: new SavedPostDataSource(),
      application: new ApplicationDataSource(),
      profile: new ProfileDataSource(),
      connection: new ConnectionDataSource(),
      people: new PeopleDataSource(),
      chat: new ChatDataSource(),
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const apolloServer = new ApolloServer<ApolloContext>({ schema });
    await apolloServer.start();

    app.use(
      '/graphql',
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({
          dataSources,
          currentUser: await getCurrentUserFromReq(req),
          req,
        }),
      })
    );

    // 6) REST routes (including your /auth/google, /auth/github, etc)
    app.use(routes);

    // 7) HTTP + WebSocket
    const httpServer = createServer(app);
    initSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server listening on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

(async () => {
  await startServer();
})();
