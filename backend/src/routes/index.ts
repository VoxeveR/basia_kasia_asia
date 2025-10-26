import { Router } from 'express';
import userRoutes from './userRoutes';

const router = Router();

// API routes
router.use('/api', userRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'BKA Forum API is running' 
  });
});

export default router;