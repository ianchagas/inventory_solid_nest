import { Inject, Injectable } from '@nestjs/common';
import { FindUserDTO } from '@user/user/dto/request/find-user.dto';
import { IUserRepository } from '@user/user/implementations/user.interface';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';
import { UserRepository } from '@user/user/infra/typeORM/repositories/user.repository';

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
