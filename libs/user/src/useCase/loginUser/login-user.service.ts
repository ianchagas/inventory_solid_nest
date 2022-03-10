/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginUserDTO } from '@user/user/dto/request/login-user.dto';
import { IUserRepository } from '@user/user/implementations/user.interface';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';
import { UserRepository } from '@user/user/infra/typeORM/repositories/user.repository';

interface IRequest {
  loginUserDto: LoginUserDTO;
}

@Injectable()
export class LoginUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute({ loginUserDto }: IRequest): Promise<string> {
    const UserExists = await this.userRepository.findByEmail(
      loginUserDto.email,
    );

    if (!UserExists) {
      throw new BadRequestException(
        'Email ou senha incorreta. Tente novamente.',
      );
    }

    const MatchPassword = await compare(
      loginUserDto.password,
      UserExists.password,
    );

    if (!MatchPassword) {
      throw new BadRequestException(
        'Email ou senha incorreta. Tente novamente.',
      );
    }

    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const GenerateJWT = jwt.sign(
      {
        id: UserExists.id,
        uuid: UserExists.uuid,
        name: UserExists.name,
        email: UserExists.email,
        admin: UserExists.admin,
        exp: exp.getTime() / 1000,
      },
      process.env.SECRET,
    );

    return GenerateJWT;
  }
}
