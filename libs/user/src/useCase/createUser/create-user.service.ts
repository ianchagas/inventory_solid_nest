/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
import { hash } from 'bcryptjs';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@user/user/dto/request/create-user.dto';
import { IUserRepository } from '@user/user/implementations/user.interface';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';
import { UserRepository } from '@user/user/infra/typeORM/repositories/user.repository';

interface IRequest {
  createUserDTO: CreateUserDTO;
}

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute({ createUserDTO }: IRequest): Promise<UserEntity> {
    const UserExists = await this.userRepository.findByEmail(
      createUserDTO.email,
    );

    if (UserExists) {
      throw new BadRequestException(
        'Já existe um usuário cadastrado com esse email.',
      );
    }

    createUserDTO.password = await hash(createUserDTO.password, 8);

    const CreateNewUser = await this.userRepository.create(createUserDTO);

    return CreateNewUser;
  }
}
