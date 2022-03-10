/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-cond-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable no-constant-condition */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '@user/user/implementations/user.interface';
import { UserRepository } from '@user/user/infra/typeORM/repositories/user.repository';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const UserExists = await this.userRepository.findByUUID(uuid);

    if (!UserExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (UserExists.admin !== true) {
      throw new BadRequestException(
        'Para excluir um usuário é necessário ter uma conta admin.',
      );
    }

    const UserForDelete = UserExists.uuid;

    return this.userRepository.delete(UserForDelete);
  }
}
