import express from 'express';
require('dotenv').config();
import { connectMongoDB } from '@db';
import routes from './routes';
const userRoutes = require("./routes/v1/authRoutes")
const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT || 3000;


const app = express();
connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/',userRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
});

