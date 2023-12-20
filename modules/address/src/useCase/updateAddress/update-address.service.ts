/* eslint-disable no-param-reassign */

import { AddressDTO } from 'modules/address/src/dto/request/address.dto';
import { IAddressRepository } from 'modules/address/src/implementations/address.interface';
import { AddressRepository } from 'modules/address/src/infra/typeORM/repositories/address.repository';
import { IPeopleRepository } from 'modules/people/src/implementations/people.interface';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';
import { UpdateResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

interface IRequest {
  uuid: string;
  updateAddressDTO: AddressDTO;
}

@Injectable()
export class UpdateAddressService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
    @Inject(AddressRepository)
    private addressRepository: IAddressRepository,
  ) {}

  async execute({ uuid, updateAddressDTO }: IRequest): Promise<UpdateResult> {
    const PeopleExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.peopleRepository,
      );
    updateAddressDTO.id_people = PeopleExists.id;
    const UpdateAddress = await this.addressRepository.update(updateAddressDTO);
    return UpdateAddress.raw;
  }
}
