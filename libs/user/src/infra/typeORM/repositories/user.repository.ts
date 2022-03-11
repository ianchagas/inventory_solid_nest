/* eslint-disable no-useless-return */
import { Repository, UpdateResult } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from '@user/user/dto/request/create-user.dto';
import { FindUserDTO } from '@user/user/dto/request/find-user.dto';
import { UpdateUserDTO } from '@user/user/dto/request/update-user.dto';
import { IUserRepository } from '@user/user/implementations/user.interface';

import { UserEntity } from '../entities/user.entity';

@Injectable()
class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const CreateNewUser = this.userRepository.create(createUserDTO);
    const SaveNewUser = await this.userRepository.save(CreateNewUser);
    return SaveNewUser;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const FindUserByEmail = this.userRepository.findOne({
        where: {
          email,
        },
      });
      return FindUserByEmail;
    } catch (Error) {
      throw new BadRequestException('Usuário não encontrado');
    }
  }

  async findByUUID(uuid: string): Promise<UserEntity> {
    const FindUserByUUID = this.userRepository.findOne({
      where: {
        uuid,
      },
    });
    return FindUserByUUID;
  }

  async find({ name, email, admin }: FindUserDTO): Promise<UserEntity[]> {
    try {
      const FindUser = this.userRepository.createQueryBuilder('user');
      if (name) {
        FindUser.where('user.name = :name', { name });
      }

      if (email) {
        FindUser.where('user.email = :email', { email });
      }

      if (admin) {
        FindUser.where('user.admin', { admin });
      }

      const FilterUser = await FindUser.getMany();
      return FilterUser;
    } catch (Error) {
      throw new BadRequestException('Parametro passado é inválido');
    }
  }

  async update({
    uuid,
    name,
    email,
    password,
    admin,
  }: UpdateUserDTO): Promise<UpdateResult> {
    const ObjectForUpdateUser = {
      name,
      email,
      password,
      admin,
    };

    const UpdateUser = this.userRepository.create(ObjectForUpdateUser);

    const UpdateResult = await this.userRepository
      .createQueryBuilder()
      .update(UpdateUser)
      .where({ uuid })
      .returning(['name', 'email'])
      .execute();

    return UpdateResult;
  }

  async delete(uuid: string): Promise<void> {
    try {
      const DeleteUser = await this.userRepository.delete({ uuid });
      const { affected } = DeleteUser;

      if (affected === 0) {
        throw new NotFoundException(
          'Não é possível excluir. Usuário não encontrado.',
        );
      }
    } catch (Error) {
      throw new NotFoundException(
        'Não é possível excluir. Usuário não encontrado.',
      );
    }
  }
}

export { UserRepository };
