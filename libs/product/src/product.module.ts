import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { CategoryRepository } from '@category/category/infra/typeORM/repositories/category.repository';
import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';
import { UnitOfMeasurementEntity } from '@unit_of_measurement/unit-of-measurement/infra/typeORM/entities/unit-of-measurement.entity';
import { UnitOfMeasurementRepository } from '@unit_of_measurement/unit-of-measurement/infra/typeORM/repositories/unit-of-measurement.repository';

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
  ],
})
export class ProductModule {}
