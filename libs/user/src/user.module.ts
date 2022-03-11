import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './infra/typeORM/entities/user.entity';
import { UserRepository } from './infra/typeORM/repositories/user.repository';
import { CreateUserController } from './useCase/createUser/create-user.controller';
import { CreateUserService } from './useCase/createUser/create-user.service';
import { DeleteUserController } from './useCase/deleteUser/delete-user.controller';
import { DeleteUserService } from './useCase/deleteUser/delete-user.service';
import { FindUserController } from './useCase/findUser/find-user.controller';
import { FindUserService } from './useCase/findUser/find-user.service';
import { LoginUserController } from './useCase/loginUser/login-user.controller';
import { LoginUserService } from './useCase/loginUser/login-user.service';
import { UpdateUserController } from './useCase/updateUser/update-user.controller';
import { UpdateUserService } from './useCase/updateUser/update-user.service';

@Module({
  controllers: [
    CreateUserController,
    UpdateUserController,
    FindUserController,
    DeleteUserController,
    LoginUserController,
  ],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserRepository,
    CreateUserService,
    UpdateUserService,
    FindUserService,
    DeleteUserService,
    LoginUserService,
  ],
})
export class UserModule {}
