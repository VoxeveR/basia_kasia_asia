import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from './Category';

@Table({
  tableName: 'forums',
  timestamps: true,
})
export class Forum extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  forum_id!: number;

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

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  category_id?: number;

  // Associations
  @BelongsTo(() => Category)
  category!: Category;
}