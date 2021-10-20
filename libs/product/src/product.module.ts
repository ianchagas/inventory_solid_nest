import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';
import { UnitOfMeasurementEntity } from '@unit_of_measurement/unit-of-measurement/infra/typeORM/entities/unit-of-measurement.entity';

import { ProductEntity } from './infra/typeORM/entities/product.entity';
import { ProductRepository } from './infra/typeORM/repositories/product.repository';
import { CreateProductController } from './useCase/createProduct/create-product.controller';
import { CreateProductService } from './useCase/createProduct/create-product.service';

@Module({
  controllers: [CreateProductController],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      PeopleEntity,
      UnitOfMeasurementEntity,
      DepositEntity,
    ]),
  ],
  providers: [CreateProductService, ProductRepository],
})
export class ProductModule {}
