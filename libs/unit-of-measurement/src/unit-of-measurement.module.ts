import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitOfMeasurementEntity } from './infra/typeORM/entities/unit-of-measurement.entity';
import { UnitOfMeasurementRepository } from './infra/typeORM/repositories/unit-of-measurement.repository';
import { CreateUnController } from './useCase/createUn/create-un.controller';
import { CreateUnService } from './useCase/createUn/create-un.service';
import { DeleteUnController } from './useCase/deleteUn/delete-un.controller';
import { DeleteUnService } from './useCase/deleteUn/delete-un.service';
import { FindAllUnController } from './useCase/findAllUn/find-all-un.controller';
import { FindAllUnService } from './useCase/findAllUn/find-all-un.service';
import { FindUnByQueryController } from './useCase/findUnByQuery/find-un-by-query.controller';
import { FindUnByQueryService } from './useCase/findUnByQuery/find-un-by-query.service';
import { UpdateUnController } from './useCase/updateUn/update-un.controller';
import { UpdateUnService } from './useCase/updateUn/update-un.service';

@Module({
  controllers: [
    CreateUnController,
    UpdateUnController,
    DeleteUnController,
    FindAllUnController,
    FindUnByQueryController,
  ],
  exports: [],
  imports: [TypeOrmModule.forFeature([UnitOfMeasurementEntity])],
  providers: [
    CreateUnService,
    UpdateUnService,
    DeleteUnService,
    FindAllUnService,
    FindUnByQueryService,
    UnitOfMeasurementRepository,
  ],
})
export class UnitOfMeasurementModule {}
