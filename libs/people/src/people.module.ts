import { AddressEntity } from 'libs/address/src/infra/typeORM/entities/address.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

import { PeopleEntity } from './infra/typeORM/entities/people.entity';
import { PeopleRepository } from './infra/typeORM/repositories/people.repository';
import { CreatePeopleController } from './useCase/createPeople/create-people.controller';
import { CreatePeopleService } from './useCase/createPeople/create-people.service';
import { DeletePeopleController } from './useCase/deletePeople/delete-people.controller';
import { DeletePeopleService } from './useCase/deletePeople/delete-people.service';
import { FindAllPeopleController } from './useCase/findAllPeople/find-all-people.controller';
import { FindAllPeopleService } from './useCase/findAllPeople/find-all-people.service';
import { FindAllPeopleWithAddressController } from './useCase/findAllPeopleWithAddress/find-all-people-with-address.controller';
import { FindAllPeopleWithAddressService } from './useCase/findAllPeopleWithAddress/find-all-people-with-address.service';
import { FindPeopleByQueryController } from './useCase/findPeopleByQuery/find-people-by-query.controller';
import { FindPeopleByQueryService } from './useCase/findPeopleByQuery/find-people-by-query.service';
import { FindPeopleByQueryWithAddressController } from './useCase/findPeopleByQueryWithAddress/find-people-by-query-with-address.controller';
import { FindPeopleByQueryWithAddressService } from './useCase/findPeopleByQueryWithAddress/find-people-by-query-with-address.service';
import { UpdatePeopleController } from './useCase/updatePeople/update-people.controller';
import { UpdatePeopleService } from './useCase/updatePeople/update-people.service';

@Module({
  controllers: [
    CreatePeopleController,
    UpdatePeopleController,
    DeletePeopleController,
    FindAllPeopleController,
    FindAllPeopleWithAddressController,
    FindPeopleByQueryController,
    FindPeopleByQueryWithAddressController,
  ],
  exports: [],
  imports: [
    TypeOrmModule.forFeature([PeopleEntity, AddressEntity, ProductEntity]),
  ],
  providers: [
    CreatePeopleService,
    UpdatePeopleService,
    DeletePeopleService,
    FindAllPeopleService,
    FindAllPeopleWithAddressService,
    FindPeopleByQueryService,
    FindPeopleByQueryWithAddressService,
    PeopleRepository,
    ProductRepository,
  ],
})
export class PeopleModule {}
