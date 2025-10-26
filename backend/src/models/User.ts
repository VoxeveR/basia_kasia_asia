import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Role } from './Role';
import { Thread } from './Thread';
import { Comment } from './Comment';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  user_id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  nickname!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password_hash!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio?: string;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  role_id?: number;

  // Associations
  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => Thread)
  threads!: Thread[];

  @HasMany(() => Comment)
  comments!: Comment[];
}