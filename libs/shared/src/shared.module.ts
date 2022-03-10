import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';
import { UserRepository } from '@user/user/infra/typeORM/repositories/user.repository';

import { AuthMiddleware } from './middleware/auth-middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, AuthMiddleware],
  exports: [UserRepository],
})
export class SharedModule {}
