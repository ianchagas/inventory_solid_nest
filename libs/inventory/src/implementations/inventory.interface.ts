import { InventoryDTO } from '../dto/request/inventory.dto';
import { InventoryEntity } from '../infra/typeORM/entities/inventory.entity';

interface IInventoryRepository {
  initialMovementInCreateProduct(data: InventoryDTO): Promise<InventoryEntity>;

  entryMovementEachOne(data: InventoryDTO): Promise<InventoryEntity>;
}

export { IInventoryRepository };
