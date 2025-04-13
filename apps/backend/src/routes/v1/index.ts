import express from 'express';
import homeRoute from './home';
import userRoutes from "./authRoutes"

const router = express.Router();


router.use('/home', homeRoute);

router.use('/auth',userRoutes)

export default router;
