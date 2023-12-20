import { Inject, Injectable } from '@nestjs/common';
import { FindUserDTO } from 'modules/user/src/dto/request/find-user.dto';
import { IUserRepository } from 'modules/user/src/implementations/user.interface';
import { UserEntity } from 'modules/user/src/infra/typeORM/entities/user.entity';
import { UserRepository } from 'modules/user/src/infra/typeORM/repositories/user.repository';

@Injectable()
export class FindUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(findUserDto: FindUserDTO): Promise<UserEntity[]> {
    return this.userRepository.find(findUserDto);
  }
}
