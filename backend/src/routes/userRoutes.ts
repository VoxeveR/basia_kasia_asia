import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateJWT, optionalAuthentication } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// Public user info routes (no auth required to view profiles)
router.get('/users', userController.getAllUsers);
router.get('/users/id/:id', userController.getUserById);
router.get('/users/nickname/:nickname', userController.getUserByNickname);

// Protected routes (require authentication)
router.put('/users/:id', authenticateJWT, userController.updateUser);
router.delete('/users/:id', authenticateJWT, userController.deleteUser);

// Test route to verify token
router.get('/me', authenticateJWT, (req, res) => {
  res.json({
    message: 'Authenticated user info',
    user: req.user,
  });
});

export default router;