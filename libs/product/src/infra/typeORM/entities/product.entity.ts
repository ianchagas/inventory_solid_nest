import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';

import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';
import { UnitOfMeasurementEntity } from '@unit_of_measurement/unit-of-measurement/infra/typeORM/entities/unit-of-measurement.entity';

@Entity('product')
class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  uuid: string;

  @Column()
  code: string;

  @Column()
  ean: string;

  @Column()
  name: string;

  @Column()
  enable: boolean;

  @OneToOne(() => PeopleEntity)
  @JoinColumn({ name: 'id_people' })
  people: PeopleEntity;
  @Column()
  id_people: number;

  @OneToOne(() => CategoryEntity)
  @JoinColumn({ name: 'id_category' })
  category: CategoryEntity;
  @Column()
  id_category: number;

  @OneToOne(() => UnitOfMeasurementEntity)
  @JoinColumn({ name: 'id_unit_of_measurement' })
  unit_of_measurement: UnitOfMeasurementEntity;
  @Column()
  id_unit_of_measurement: number;

  @OneToOne(() => DepositEntity)
  @JoinColumn({ name: 'id_deposit' })
  deposit: DepositEntity;
  @Column()
  id_deposit: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { ProductEntity };
