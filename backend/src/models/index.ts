import 'reflect-metadata';

// Export all models
export { Role } from './Role';
export { User } from './User';
export { Category } from './Category';
export { Forum } from './Forum';
export { Thread } from './Thread';
export { Comment } from './Comment';

// You can also export a models array for easy iteration
import { Role } from './Role';
import { User } from './User';
import { Category } from './Category';
import { Forum } from './Forum';
import { Thread } from './Thread';
import { Comment } from './Comment';

export const models = [
  Role,
  User,
  Category,
  Forum,
  Thread,
  Comment,
];