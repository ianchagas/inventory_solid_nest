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
  entry_movement_quantity: number;

  @Column()
  exit_movement_quantity: number;

  @Column()
  cost_price_movement: number;

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
