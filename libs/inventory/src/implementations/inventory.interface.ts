import { InventoryDTO } from '../dto/request/inventory.dto';
import { InventoryEntity } from '../infra/typeORM/entities/inventory.entity';

interface IInventoryRepository {
  entryMovementEachOne(data: InventoryDTO): Promise<InventoryEntity>;
  findActuallyQuantity(id_product: number): Promise<number | undefined>;
}

export { IInventoryRepository };
