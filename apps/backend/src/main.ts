import express from 'express';
import dotenv from 'dotenv';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { connectMongoDB } from '@db';
import routes from './routes';
const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT || 3000;



dotenv.config();
const app = express();
connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
});

