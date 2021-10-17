import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { CategoryEntity };
