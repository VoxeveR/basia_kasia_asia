import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { Forum } from '../models/Forum';
import { Thread } from '../models/Thread';
import { Comment } from '../models/Comment';
import logger from './logger';

// Database configuration
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../../db/database.db'),
  models: [Role, User, Forum, Thread, Comment],
  logging: process.env.NODE_ENV === 'development' ? logger.log : false,
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// Test database connection
export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info(`Database connection established successfully.`);
    
    // Sync models with database - force recreation for clean start
    await sequelize.sync({ force: true });
    logger.info(`Database models synchronized.`);
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;