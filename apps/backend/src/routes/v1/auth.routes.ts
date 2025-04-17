import express from 'express'; 
import { AuthController } from '../../controllers/auth.controller';

const router = express.Router();

const authController = new AuthController();

router.post('/login', authController.loginUser);
router.post('/signup', authController.signupUser);

// Google OAuth
router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);


export default router;

