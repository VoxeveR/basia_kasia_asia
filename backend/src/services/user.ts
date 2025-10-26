import { User } from '../models/User';
import { Role } from '../models/Role';

export interface UserResponse {
  user_id: number;
  username: string;
  email: string;
  date_of_birth?: Date | null;
  gender?: string | null;
  role_id?: number | null;
  created_at?: string;
  updated_at?: string;
  role?: {
    role_id: number;
    name: string;
  };
}

/**
 * Ensure default roles exist in the database
 */
export const ensureDefaultRoles = async (): Promise<void> => {
  try {
    // Check if any roles exist
    const roleCount = await Role.count();
    
    if (roleCount === 0) {
      // Create default roles
      await Role.bulkCreate([
        { name: 'user' },
        { name: 'moderator' },
        { name: 'admin' }
      ]);
      console.log('Default roles created');
    }
  } catch (error) {
    console.error('Error ensuring default roles:', error);
  }
};

/**
 * Get default user role ID
 */
export const getDefaultUserRoleId = async (): Promise<number | null> => {
  try {
    const userRole = await Role.findOne({ where: { name: 'user' } });
    return userRole ? userRole.role_id : null;
  } catch (error) {
    console.error('Error getting default user role:', error);
    return null;
  }
};

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
  username: string;
  email: string;
  password_hash: string;
  date_of_birth: Date | undefined;
  gender: string;
  role_id?: number;
}): Promise<UserResponse> => {
  try {
    // Ensure default roles exist
    await ensureDefaultRoles();
    
    // Validate role_id if provided
    let validatedRoleId: number | undefined = userData.role_id;
    if (userData.role_id) {
      const roleExists = await Role.findByPk(userData.role_id);
      if (!roleExists) {
        console.warn(`Role ID ${userData.role_id} does not exist, using default user role`);
        const defaultRoleId = await getDefaultUserRoleId();
        validatedRoleId = defaultRoleId || undefined;
      }
    } else {
      // If no role_id provided, use default user role
      const defaultRoleId = await getDefaultUserRoleId();
      validatedRoleId = defaultRoleId || undefined;
    }
    
    const user = await User.create({
      ...userData,
      role_id: validatedRoleId
    });
    
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
