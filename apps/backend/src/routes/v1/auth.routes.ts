import express from 'express'; 
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { AuthController } from '../../controllers/auth.controller';

const router = express.Router();

const authController = new AuthController();

router.post('/login', authController.loginUser);
router.post('/signup', authController.signupUser);

// oauth routes
router.get('/google', authController.googleAuth);

router.get('/google/callback', authController.googleAuthCallback);


export default router;

