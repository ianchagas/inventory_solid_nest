import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';

import { AddressEntity } from './infra/typeORM/entities/address.entity';
import { AddressRepository } from './infra/typeORM/repositories/address.repository';
import { CreateAddressController } from './useCase/createAddress/create-address.controller';
import { CreateAddressService } from './useCase/createAddress/create-address.service';
import { DeleteAddressController } from './useCase/deleteAddress/delete-address.controller';
import { DeleteAddressService } from './useCase/deleteAddress/delete-address.service';
import { UpdateAddressController } from './useCase/updateAddress/update-address.controller';
import { UpdateAddressService } from './useCase/updateAddress/update-address.service';

@Module({
  controllers: [
    CreateAddressController,
    UpdateAddressController,
    DeleteAddressController,
  ],
  exports: [],
  imports: [TypeOrmModule.forFeature([AddressEntity, PeopleEntity])],
  providers: [
    CreateAddressService,
    UpdateAddressService,
    DeleteAddressService,
    AddressRepository,
    PeopleRepository,
  ],
})
export class AddressModule {}
