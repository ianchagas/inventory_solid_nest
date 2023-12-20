/* eslint-disable no-param-reassign */
import { AddressDTO } from 'modules/address/src/dto/request/address.dto';
import { IAddressRepository } from 'modules/address/src/implementations/address.interface';
import { AddressEntity } from 'modules/address/src/infra/typeORM/entities/address.entity';
import { AddressRepository } from 'modules/address/src/infra/typeORM/repositories/address.repository';
import { IPeopleRepository } from 'modules/people/src/implementations/people.interface';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

import { Inject, Injectable } from '@nestjs/common';

interface IRequest {
  uuid: string;
  createAddressDTO: AddressDTO;
}

@Injectable()
export class CreateAddressService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
    @Inject(AddressRepository)
    private addressRepository: IAddressRepository,
  ) {}

  async execute({ uuid, createAddressDTO }: IRequest): Promise<AddressEntity> {
    const PeopleExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.peopleRepository,
      );

    createAddressDTO.id_people = PeopleExists.id;

    return this.addressRepository.create(createAddressDTO);
  }
}
