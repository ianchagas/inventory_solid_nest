import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

import { InventoryEntity } from './infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from './infra/typeORM/repositories/inventory.repository';
import { EntryMovementEachOneController } from './useCase/entryMovementEachOne/entry-movement-each-one.controller';
import { EntryMovementEachOneService } from './useCase/entryMovementEachOne/entry-movement-each-one.service';

@Module({
  controllers: [EntryMovementEachOneController],
  exports: [],
  imports: [TypeOrmModule.forFeature([InventoryEntity, ProductEntity])],
  providers: [
    EntryMovementEachOneService,
    InventoryRepository,
    ProductRepository,
  ],
})
export class InventoryModule {}
