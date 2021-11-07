import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '../dto/request/inventory.dto';
import { InventoryEntity } from '../infra/typeORM/entities/inventory.entity';

interface IInventoryRepository {
  createFirstMovement(data: InventoryDTO): Promise<InventoryEntity>;
  findActuallyQuantity(id_product: number): Promise<number | undefined>;
  findMovementExists(id_product: number): Promise<InventoryEntity>;
  updateEntryMovementEachOne(
    id_product: number,
    quantity: number,
  ): Promise<UpdateResult>;
  updateEntryMovement(
    id_product: number,
    quantity: number,
    cost_price: number,
  ): Promise<UpdateResult>;
}

export { IInventoryRepository };
