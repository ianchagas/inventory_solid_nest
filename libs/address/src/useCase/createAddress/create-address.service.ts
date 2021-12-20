/* eslint-disable no-param-reassign */
import { AddressDTO } from '@address/address/dto/request/address.dto';
import { IAddressRepository } from '@address/address/implementations/address.interface';
import { AddressEntity } from '@address/address/infra/typeORM/entities/address.entity';
import { AddressRepository } from '@address/address/infra/typeORM/repositories/address.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';

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
    const PeopleExists = await this.peopleRepository.findPeopleByIUUID(uuid);
    if (!PeopleExists) {
      throw new NotFoundException('Entidade não encontrada');
    }

    createAddressDTO.id_people = PeopleExists.id;

    return this.addressRepository.create(createAddressDTO);
  }
}
