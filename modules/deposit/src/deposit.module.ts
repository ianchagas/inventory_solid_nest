import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';

import { DepositEntity } from './infra/typeORM/entities/deposit.entity';
import { DepositRepository } from './infra/typeORM/repositories/deposit.repository';
import { CreateDepositController } from './useCase/createDeposit/create-deposit.controller';
import { CreateDepositService } from './useCase/createDeposit/create-deposit.service';
import { DeleteDepositController } from './useCase/deleteDeposit/delete-deposit.controller';
import { DeleteDepositService } from './useCase/deleteDeposit/delete-deposit.service';
import { FindAllDepositController } from './useCase/findAllDeposit/find-all-deposit.controller';
import { FindAllDepositService } from './useCase/findAllDeposit/find-all-deposit.service';
import { FindDepositByQueryController } from './useCase/findDepositByQuery/find-deposit-by-query.controller';
import { FindDepositByQueryService } from './useCase/findDepositByQuery/find-deposit-by-query.service';
import { UpdateDepositController } from './useCase/updateDeposit/update-deposit.controller';
import { UpdateDepositService } from './useCase/updateDeposit/update-deposit.service';

@Module({
  controllers: [
    CreateDepositController,
    UpdateDepositController,
    DeleteDepositController,
    FindAllDepositController,
    FindDepositByQueryController,
  ],
  exports: [],
  imports: [TypeOrmModule.forFeature([DepositEntity, ProductEntity])],
  providers: [
    CreateDepositService,
    UpdateDepositService,
    DeleteDepositService,
    FindAllDepositService,
    FindDepositByQueryService,
    DepositRepository,
    ProductRepository,
  ],
})
export class DepositModule {}
