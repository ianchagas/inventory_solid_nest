import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '@user/user/dto/request/create-user.dto';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';

import { CreateUserService } from './create-user.service';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller()
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}
  @ApiOperation({
    summary: 'Cria um novo usuário.',
  })
  @Post('/api/melanzane/user/create')
  async handle(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const CreateUser = this.createUserService.execute({ createUserDTO });
    return CreateUser;
  }
}
