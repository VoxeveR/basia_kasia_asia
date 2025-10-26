import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare category_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description?: string;
}