import express from 'express'; // Use import instead of require
import { AuthController } from '../../controllers/auth.controller';

const router = express.Router();

const authController = new AuthController();

router.post('/login', authController.loginUser);
router.post('/signup', authController.signupUser);

export default router;
