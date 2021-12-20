import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '@user/user/dto/request/create-user.dto';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';

import { CreateUserService } from './create-user.service';

@Controller()
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}
  @Post('/user/create')
  async handle(@Body() createUserService: CreateUserDTO): Promise<UserEntity> {
    const CreateUser = this.createUserService.execute(createUserService);
    return CreateUser;
  }
}
