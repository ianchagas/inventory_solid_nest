import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';

import { InventoryMovementEntity } from './infra/typeORM/entities/inventory-movement.entity';
import { InventoryEntity } from './infra/typeORM/entities/inventory.entity';
import { InventoryMovementRepository } from './infra/typeORM/repositories/inventory-movement.repository';
import { InventoryRepository } from './infra/typeORM/repositories/inventory.repository';
import { AdjustmentMovementController } from './useCase/adjustmentMovement/adjustment-movement.controller';
import { AdjustmentMovementService } from './useCase/adjustmentMovement/adjustment-movement.service';
import { EntryMovementController } from './useCase/entryMovement/entry-movement.controller';
import { EntryMovementService } from './useCase/entryMovement/entry-movement.service';
import { EntryMovementEachOneController } from './useCase/entryMovementEachOne/entry-movement-each-one.controller';
import { EntryMovementEachOneService } from './useCase/entryMovementEachOne/entry-movement-each-one.service';
import { ExitMovementController } from './useCase/exitMovement/exit-movement.controller';
import { ExitMovementService } from './useCase/exitMovement/exit.movement.service';
import { ExitMovementEachOneController } from './useCase/exitMovementEachOne/exit-movement-each-one.controller';
import { ExitMovementEachOneService } from './useCase/exitMovementEachOne/exit-movement-each-one.service';
import { FindAllInventoryController } from './useCase/findAllInventory/find-all-inventory.controller';
import { FindAllInventoryService } from './useCase/findAllInventory/find-all-inventory.service';
import { FindInventoryByQueryController } from './useCase/findInventoryByQuery/find-inventory-by-query.controller';
import { FindInventoryByQueryService } from './useCase/findInventoryByQuery/find-inventory-by-query.service';
import { UpdateCostPriceController } from './useCase/updateCostPrice/update-cost-price.controller';
import { UpdateCostPriceService } from './useCase/updateCostPrice/update-cost-price.service';
import { UpdateMinMaxQuantityController } from './useCase/updateMinMaxQuantity/update-min-max-quantity.controller';
import { UpdateMinMaxQuantityService } from './useCase/updateMinMaxQuantity/update-min-max-quantity.service';

@Module({
  controllers: [
    AdjustmentMovementController,
    EntryMovementController,
    EntryMovementEachOneController,
    ExitMovementController,
    ExitMovementEachOneController,
    UpdateCostPriceController,
    UpdateMinMaxQuantityController,
    FindAllInventoryController,
    FindInventoryByQueryController,
  ],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([
      InventoryEntity,
      InventoryMovementEntity,
      ProductEntity,
    ]),
  ],
  providers: [
    AdjustmentMovementService,
    EntryMovementService,
    EntryMovementEachOneService,
    ExitMovementService,
    ExitMovementEachOneService,
    UpdateCostPriceService,
    UpdateMinMaxQuantityService,
    FindAllInventoryService,
    FindInventoryByQueryService,
    InventoryRepository,
    ProductRepository,
    InventoryMovementRepository,
  ],
})
export class InventoryModule {}
