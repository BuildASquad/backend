import express from 'express';
import homeRoute from './home';


const router = express.Router();


router.use('/home', homeRoute);

export default router;
