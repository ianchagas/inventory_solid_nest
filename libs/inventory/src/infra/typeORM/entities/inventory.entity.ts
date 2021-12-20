import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { InventoryMovementEntity } from './inventory-movement.entity';

@Entity('inventory')
class InventoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  uuid: string;

  @Column()
  quantity: number;

  @Column()
  cost_price: number;

  @Column()
  min_quantity: number;

  @Column()
  max_quantity: number;

  @OneToOne(() => ProductEntity, (product) => product.inventory)
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;

  @OneToOne(
    () => InventoryMovementEntity,
    (inventorymovement) => inventorymovement.inventory,
  )
  @JoinTable()
  inventory_movement: InventoryMovementEntity;

  @Column()
  id_product: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { InventoryEntity };
