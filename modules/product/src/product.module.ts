import { InventoryEntity } from 'modules/inventory/src/infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from 'modules/inventory/src/infra/typeORM/repositories/inventory.repository';

import { CategoryEntity } from 'modules/category/src/infra/typeORM/entities/category.entity';
import { CategoryRepository } from 'modules/category/src/infra/typeORM/repositories/category.repository';
import { DepositEntity } from 'modules/deposit/src/infra/typeORM/entities/deposit.entity';
import { DepositRepository } from 'modules/deposit/src/infra/typeORM/repositories/deposit.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from 'modules/people/src/infra/typeORM/entities/people.entity';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import { UnitOfMeasurementEntity } from 'modules/unit-of-measurement/src/infra/typeORM/entities/unit-of-measurement.entity';
import { UnitOfMeasurementRepository } from 'modules/unit-of-measurement/src/infra/typeORM/repositories/unit-of-measurement.repository';

import { ProductEntity } from './infra/typeORM/entities/product.entity';
import { ProductRepository } from './infra/typeORM/repositories/product.repository';
import { CreateProductController } from './useCase/createProduct/create-product.controller';
import { CreateProductService } from './useCase/createProduct/create-product.service';
import { DeleteProductController } from './useCase/deleteProduct/delete-product.controller';
import { DeleteProductService } from './useCase/deleteProduct/delete-product.service';
import { FindAllProductController } from './useCase/findAllProduct/find-all-product.controller';
import { FindAllProductService } from './useCase/findAllProduct/find-all-product.service';
import { FindProductByQueryController } from './useCase/findProductByQuery/find-product-by-query.controller';
import { FindProductByQueryService } from './useCase/findProductByQuery/find-product-by-query.service';
import { UpdateProductController } from './useCase/updateProduct/update-product.controller';
import { UpdateProductService } from './useCase/updateProduct/update-product.service';

@Module({
  controllers: [
    CreateProductController,
    UpdateProductController,
    DeleteProductController,
    FindAllProductController,
    FindProductByQueryController,
  ],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      PeopleEntity,
      UnitOfMeasurementEntity,
      DepositEntity,
      CategoryEntity,
      InventoryEntity,
    ]),
  ],
  providers: [
    CreateProductService,
    UpdateProductService,
    DeleteProductService,
    FindAllProductService,
    FindProductByQueryService,
    ProductRepository,
    DepositRepository,
    UnitOfMeasurementRepository,
    CategoryRepository,
    PeopleRepository,
    InventoryRepository,
  ],
})
export class ProductModule {}
