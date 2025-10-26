import 'reflect-metadata';
import express, { Request, Response } from "express";
import cors from 'cors';
import { connectDatabase } from './config/database';
import { ensureDefaultRoles } from './services/user';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// 404 handler
app.use((req: Request, res: Response, next: any) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} was not found on this server.`
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Connect to database and sync models
    await connectDatabase();
    
    // Ensure default roles exist
    await ensureDefaultRoles();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📚 API documentation available at http://localhost:${PORT}/health`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
