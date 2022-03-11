import { UpdateResult } from 'typeorm';

import { CreateUserDTO } from '../dto/request/create-user.dto';
import { FindUserDTO } from '../dto/request/find-user.dto';
import { UpdateUserDTO } from '../dto/request/update-user.dto';
import { UserEntity } from '../infra/typeORM/entities/user.entity';

interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findByUUID(uuid: string): Promise<UserEntity>;
  find(data: FindUserDTO): Promise<UserEntity[]>;
  update(data: UpdateUserDTO): Promise<UpdateResult | any>;
  delete(uuid: string): Promise<void>;
}

export { IUserRepository };
