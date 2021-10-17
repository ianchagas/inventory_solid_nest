import { hash } from 'bcryptjs';

import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@user/user/dto/request/create-user.dto';
import { IUserRepository } from '@user/user/implementations/user.interface';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';
import { UserRepository } from '@user/user/infra/typeORM/repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    await hash(createUserDTO.password, 8);
    const CreateUser = await this.userRepository.create(createUserDTO);

    return CreateUser;
  }
}
