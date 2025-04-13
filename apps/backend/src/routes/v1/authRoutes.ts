import express from 'express';  // Use import instead of require
import { loginUser, signupUser } from '../../controllers/authController';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);

export default router