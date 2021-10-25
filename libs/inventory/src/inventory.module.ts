import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

import { InventoryEntity } from './infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from './infra/typeORM/repositories/inventory.repository';

@Module({
  controllers: [],
  exports: [],
  imports: [TypeOrmModule.forFeature([InventoryEntity, ProductEntity])],
  providers: [InventoryRepository, ProductRepository],
})
export class InventoryModule {}
