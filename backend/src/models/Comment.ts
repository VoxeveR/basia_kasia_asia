import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Thread } from './Thread';
import { User } from './User';

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  comment_id!: number;

  @ForeignKey(() => Thread)
  @Column(DataType.INTEGER)
  thread_id?: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id?: number;

  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  parent_comment_id?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  content?: string;

  // Associations
  @BelongsTo(() => Thread)
  thread!: Thread;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Comment)
  parentComment!: Comment;
}