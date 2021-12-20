import { UpdateResult } from 'typeorm';

import { AddressDTO } from '../dto/request/address.dto';
import { AddressEntity } from '../infra/typeORM/entities/address.entity';

interface IAddressRepository {
  create(data: AddressDTO): Promise<AddressEntity>;

  update(data: AddressDTO): Promise<UpdateResult>;

  delete(id: number): Promise<void>;
}

export { IAddressRepository };
