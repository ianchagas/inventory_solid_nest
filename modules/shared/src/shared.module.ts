import { UserEntity } from 'modules/user/src/infra/typeORM/entities/user.entity';
import { UserRepository } from 'modules/user/src/infra/typeORM/repositories/user.repository';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './middleware/auth-middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, AuthMiddleware],
  exports: [UserRepository],
})
export class SharedModule {}
