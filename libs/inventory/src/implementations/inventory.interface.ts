import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '../dto/request/inventory.dto';
import { InventoryEntity } from '../infra/typeORM/entities/inventory.entity';

interface IInventoryRepository {
  createFirstMovement(data: InventoryDTO): Promise<InventoryEntity>;
  findActuallyQuantity(id_product: number): Promise<number | undefined>;
  findMovementExists(id_product: number): Promise<InventoryEntity[]>;
  updateEntryMovementEachOne(
    id_product: number,
    quantity: number,
  ): Promise<UpdateResult>;
  updateEntryMovement(
    id_product: number,
    quantity: number,
    cost_price: number,
  ): Promise<UpdateResult>;
  updateExitMovementEachOne(
    id_product: number,
    quantity: number,
  ): Promise<UpdateResult>;
  updateExitMovement(
    id_product: number,
    quantity: number,
    cost_price: number,
  ): Promise<UpdateResult>;
  updateAdjustmentMovement(
    id_product: number,
    quantity: number,
    cost_price: number,
    max_quantity: number,
    min_quantity: number,
  ): Promise<UpdateResult>;
  updateCostPrice(
    id_product: number,
    cost_price: number,
  ): Promise<UpdateResult>;
  updateMinMaxQuantity(
    id_product: number,
    min_quantity: number,
    max_quantity: number,
  ): Promise<UpdateResult>;
}

export { IInventoryRepository };
