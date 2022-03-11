import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { InventoryEntity } from './inventory.entity';

@Entity('inventory_movement')
class InventoryMovementEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  uuid: string;

  @Column()
  actually_quantity: number;

  @Column()
  entry_amount_moved: number;

  @Column()
  exit_amount_moved: number;

  @Column()
  actually_cost_price: number;

  @Column()
  comments: string;

  @OneToOne(() => InventoryEntity, (inventory) => inventory.inventory_movement)
  @JoinColumn({ name: 'id_inventory' })
  inventory: InventoryEntity;

  @Column()
  id_inventory: number;

  @CreateDateColumn()
  date_movement: Date;
}

export { InventoryMovementEntity };
