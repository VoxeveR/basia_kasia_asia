import { Request, Response } from 'express';
import * as userService from '../services/user';
import { generateToken } from '../services/auth';
import bcrypt from 'bcrypt';

/**
 * Get user by ID
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    
    const user = await userService.getUserById(userId, true);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get user by nickname
 */
export const getUserByNickname = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nickname } = req.params;
    
    const user = await userService.getUserByNickname(nickname, true);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error getting user by nickname:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get all users with pagination
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const users = await userService.getAllUsers(limit, offset);
    
    res.json({
      users,
      pagination: {
        limit,
        offset,
        count: users.length,
      },
    });
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Create new user (registration)
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nickname, email, password, bio, role_id } = req.body;
    
    // Validate required fields
    if (!nickname || !email || !password) {
      res.status(400).json({ error: 'Nickname, email, and password are required' });
      return;
    }
    
    // Hash password
    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const newUser = await userService.createUser({
      nickname,
      email,
      password_hash,
      bio,
      role_id,
    });
    
    // Generate JWT token
    const token = generateToken({
      userId: newUser.user_id,
      nickname: newUser.nickname,
      email: newUser.email,
      roleId: newUser.role_id,
    });
    
    res.status(201).json({
      user: newUser,
      token,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ error: 'User with this email or nickname already exists' });
      return;
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Update user profile
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const { nickname, email, bio, role_id } = req.body;
    
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    
    // Check if user can update this profile (either own profile or admin)
    if (req.user && req.user.userId !== userId && req.user.roleId !== 1) {
      res.status(403).json({ error: 'Cannot update another user\'s profile' });
      return;
    }
    
    const updatedUser = await userService.updateUser(userId, {
      nickname,
      email,
      bio,
      role_id,
    });
    
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Delete user
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    
    // Check if user can delete this profile (either own profile or admin)
    if (req.user && req.user.userId !== userId && req.user.roleId !== 1) {
      res.status(403).json({ error: 'Cannot delete another user\'s profile' });
      return;
    }
    
    const deleted = await userService.deleteUser(userId);
    
    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * User login
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    
    // Get user with password hash
    const user = await userService.getUserByEmail(email, true);
    
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: user.user_id,
      nickname: user.nickname,
      email: user.email,
      roleId: user.role_id,
    });
    
    // Return user info without password hash
    const { password_hash, ...userResponse } = user;
    
    res.json({
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  getUserById,
  getUserByNickname,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};