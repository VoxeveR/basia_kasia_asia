import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

// Public routes
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

export default router;