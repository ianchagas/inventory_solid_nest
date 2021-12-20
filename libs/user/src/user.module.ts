import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './infra/typeORM/entities/user.entity';
import { UserRepository } from './infra/typeORM/repositories/user.repository';
import { CreateUserController } from './useCase/createUser/create-user.controller';
import { CreateUserService } from './useCase/createUser/create-user.service';

@Module({
  controllers: [CreateUserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, CreateUserService],
})
export class UserModule {}
