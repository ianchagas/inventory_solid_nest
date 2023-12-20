import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';

import { CategoryEntity } from 'modules/category/src/infra/typeORM/entities/category.entity';
import { DepositEntity } from 'modules/deposit/src/infra/typeORM/entities/deposit.entity';
import { InventoryEntity } from 'modules/inventory/src/infra/typeORM/entities/inventory.entity';
import { PeopleEntity } from 'modules/people/src/infra/typeORM/entities/people.entity';
import { UnitOfMeasurementEntity } from 'modules/unit-of-measurement/src/infra/typeORM/entities/unit-of-measurement.entity';

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

  @OneToOne(() => InventoryEntity, (inventory) => inventory.product)
  @JoinTable()
  inventory: InventoryEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { ProductEntity };
