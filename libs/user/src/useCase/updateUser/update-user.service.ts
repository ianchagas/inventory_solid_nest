/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
import { hash } from 'bcryptjs';
import { UpdateResult } from 'typeorm';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from '@user/user/dto/request/update-user.dto';
import { IUserRepository } from '@user/user/implementations/user.interface';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';
import { UserRepository } from '@user/user/infra/typeORM/repositories/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(
    uuid: string,
    updateUserDto: UpdateUserDTO,
  ): Promise<UpdateResult | any> {
    const UserExists = await this.userRepository.findByUUID(uuid);

    if (!UserExists) {
      throw new BadRequestException(
        'Não existe usuário cadastrado para esse registro.',
      );
    }

    updateUserDto.uuid = UserExists.uuid;
    updateUserDto.password = await hash(updateUserDto.password, 8);

    const UpdateUser = await this.userRepository.update(updateUserDto);

    return UpdateUser.raw;
  }
}
