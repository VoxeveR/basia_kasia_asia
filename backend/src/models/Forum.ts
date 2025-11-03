import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from './Category';
import { Thread } from './Thread';

@Table({
  tableName: 'forums',
  timestamps: true,
})
export class Forum extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare forum_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description?: string;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  declare category_id?: number;

  // Associations
  @BelongsTo(() => Category)
  declare category: Category;

  @HasMany(() => Thread)
  declare threads: Thread[];
}