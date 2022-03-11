/* eslint-disable no-param-reassign */
import { IAddressRepository } from '@address/address/implementations/address.interface';
import { AddressRepository } from '@address/address/infra/typeORM/repositories/address.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

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
