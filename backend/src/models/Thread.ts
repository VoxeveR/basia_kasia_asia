import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Forum } from './Forum';
import { User } from './User';
import { Comment } from './Comment';

@Table({
  tableName: 'threads',
  timestamps: true,
})
export class Thread extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  thread_id!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @ForeignKey(() => Forum)
  @Column(DataType.INTEGER)
  forum_id?: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id?: number;

  // Associations
  @BelongsTo(() => Forum)
  forum!: Forum;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Comment)
  comments!: Comment[];
}