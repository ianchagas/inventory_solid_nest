/* eslint-disable no-useless-return */

import { AddressDTO } from 'modules/address/src/dto/request/address.dto';
import { IAddressRepository } from 'modules/address/src/implementations/address.interface';
import { Repository, UpdateResult } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AddressEntity } from '../entities/address.entity';

@Injectable()
class AddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async create(createAddressDTO: AddressDTO): Promise<AddressEntity> {
    const CreateAddress = this.addressRepository.create(createAddressDTO);
    const SaveAddress = this.addressRepository.save(CreateAddress);

    return SaveAddress;
  }

  async update({
    id_people,
    street,
    district,
    city,
    uf,
    number,
    complement,
    comments,
  }: AddressDTO): Promise<UpdateResult> {
    const UpdateAddress = this.addressRepository.create({
      id_people,
      street,
      district,
      city,
      uf,
      number,
      complement,
      comments,
    });

    const Update = await this.addressRepository
      .createQueryBuilder()
      .update(UpdateAddress)
      .where({ id_people })
      .returning([
        'street',
        'district',
        'city',
        'uf',
        'number',
        'complement',
        'comments',
      ])
      .execute();

    return Update;
  }

  async delete(id: number): Promise<void> {
    try {
      const DeleteAddress = await this.addressRepository.delete({
        id_people: id,
      });
      const { affected } = DeleteAddress;

      if (affected === 0) {
        throw new NotFoundException(
          'Não é possível excluir. Entidade relacionada ao endereço não existe',
        );
      }
    } catch (Error) {
      throw new NotFoundException(
        'Não é possível excluir. Entidade relacionada ao endereço não existe',
      );
    }
  }
}

export { AddressRepository };
