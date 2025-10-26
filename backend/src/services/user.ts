import { User } from '../models/User';
import { Role } from '../models/Role';

export interface UserResponse {
  user_id: number;
  nickname: string;
  email: string;
  bio?: string | null;
  role_id?: number | null;
  created_at?: string;
  updated_at?: string;
  role?: {
    role_id: number;
    name: string;
  };
}

/**
 * Get a user by their numeric ID.
 * @param userId numeric user id
 * @param includeRole whether to include role information
 * @returns Promise resolving to User or null if not found
 */
export const getUserById = async (
  userId: number,
  includeRole: boolean = false
): Promise<UserResponse | null> => {
  try {
    const user = await User.findByPk(userId, {
      include: includeRole ? [{ model: Role, as: 'role' }] : [],
      attributes: { exclude: ['password_hash'] },
    });
    
    if (!user) return null;
    
    return user.toJSON() as UserResponse;
  } catch (error) {
    throw new Error(`Failed to get user by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Get a user by their nickname.
 * @param nickname user's unique nickname
 * @param includeRole whether to include role information
 * @returns Promise resolving to User or null if not found
 */
export const getUserByNickname = async (
  nickname: string,
  includeRole: boolean = false
): Promise<UserResponse | null> => {
  try {
    const user = await User.findOne({
      where: { nickname },
      include: includeRole ? [{ model: Role, as: 'role' }] : [],
      attributes: { exclude: ['password_hash'] },
    });
    
    if (!user) return null;
    
    return user.toJSON() as UserResponse;
  } catch (error) {
    throw new Error(`Failed to get user by nickname: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Get a user by their email (for authentication).
 * @param email user's email
 * @param includePasswordHash whether to include password hash (for auth)
 * @returns Promise resolving to User or null if not found
 */
export const getUserByEmail = async (
  email: string,
  includePasswordHash: boolean = false
): Promise<any> => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: includePasswordHash 
        ? undefined 
        : { exclude: ['password_hash'] },
    });
    
    if (!user) return null;
    
    return user.toJSON();
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Get all users (minimal list).
 * @param limit maximum number of users to return
 * @param offset number of users to skip
 * @returns Promise resolving to array of Users
 */
export const getAllUsers = async (
  limit: number = 50,
  offset: number = 0
): Promise<UserResponse[]> => {
  try {
    const users = await User.findAll({
      limit,
      offset,
      attributes: { exclude: ['password_hash'] },
      include: [{ model: Role, as: 'role' }],
      order: [['created_at', 'DESC']],
    });
    
    return users.map(user => user.toJSON()) as UserResponse[];
  } catch (error) {
    throw new Error(`Failed to get all users: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Create a new user.
 * @param userData user data
 * @returns Promise resolving to created User
 */
export const createUser = async (userData: {
  nickname: string;
  email: string;
  password_hash: string;
  bio?: string;
  role_id?: number;
}): Promise<UserResponse> => {
  try {
    const user = await User.create(userData);
    const userResponse = await getUserById(user.user_id, true);
    
    if (!userResponse) {
      throw new Error('Failed to retrieve created user');
    }
    
    return userResponse;
  } catch (error) {
    throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Update user information.
 * @param userId user ID
 * @param updateData data to update
 * @returns Promise resolving to updated User or null if not found
 */
export const updateUser = async (
  userId: number,
  updateData: {
    nickname?: string;
    email?: string;
    bio?: string;
    role_id?: number;
  }
): Promise<UserResponse | null> => {
  try {
    const [affectedCount] = await User.update(updateData, {
      where: { user_id: userId },
    });
    
    if (affectedCount === 0) return null;
    
    return getUserById(userId, true);
  } catch (error) {
    throw new Error(`Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Delete a user.
 * @param userId user ID
 * @returns Promise resolving to boolean indicating success
 */
export const deleteUser = async (userId: number): Promise<boolean> => {
  try {
    const deletedCount = await User.destroy({
      where: { user_id: userId },
    });
    
    return deletedCount > 0;
  } catch (error) {
    throw new Error(`Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export default {
  getUserById,
  getUserByNickname,
  getUserByEmail,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
