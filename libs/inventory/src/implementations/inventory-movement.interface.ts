import { InventoryMovementDTO } from '../dto/request/inventory-movement.dto';
import { InventoryMovementEntity } from '../infra/typeORM/entities/inventory-movement.entity';

interface IInventoryMovementRepository {
  createInventoryMovement(
    data: InventoryMovementDTO,
  ): Promise<InventoryMovementEntity | any>;
}

export { IInventoryMovementRepository };
