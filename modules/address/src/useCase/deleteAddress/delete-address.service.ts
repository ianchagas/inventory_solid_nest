/* eslint-disable no-param-reassign */
import { IAddressRepository } from 'modules/address/src/implementations/address.interface';
import { AddressRepository } from 'modules/address/src/infra/typeORM/repositories/address.repository';
import { IPeopleRepository } from 'modules/people/src/implementations/people.interface';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAddressService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
    @Inject(AddressRepository)
    private addressRepository: IAddressRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const PeopleExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.peopleRepository,
      );
    const PeopleId = PeopleExists.id;
    return this.addressRepository.delete(PeopleId);
  }
}
