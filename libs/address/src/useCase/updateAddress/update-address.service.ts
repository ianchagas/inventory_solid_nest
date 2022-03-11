/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { AddressDTO } from '@address/address/dto/request/address.dto';
import { IAddressRepository } from '@address/address/implementations/address.interface';
import { AddressRepository } from '@address/address/infra/typeORM/repositories/address.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

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
