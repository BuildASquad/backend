import express from 'express';
import dotenv from 'dotenv';
import { connectMongoDB } from '@db';
import routes from './routes';
import passport from 'passport'
import session from 'express-session'
const HOST = process.env.HOST ?? 'localhost';
const PORT = process.env.PORT || 3000;



dotenv.config();
const app = express();
connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

app.use(session({
  secret:"abcdefghijklmnopqrstuvwxyz",
  resave:false,
  saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session())

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
});

