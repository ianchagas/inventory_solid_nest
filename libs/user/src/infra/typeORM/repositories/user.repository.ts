import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '@user/user/dto/request/create-user.dto';
import { IUserRepository } from '@user/user/implementations/user.interface';

import { UserEntity } from '../entities/user.entity';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const CreateUser = this.userRepository.create(createUserDTO);
    const SaveUser = this.userRepository.save(CreateUser);
    return SaveUser;
  }
}

export { UserRepository };
