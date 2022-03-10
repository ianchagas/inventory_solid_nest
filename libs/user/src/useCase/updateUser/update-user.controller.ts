import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';
import { CreateUserDTO } from '@user/user/dto/request/create-user.dto';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';

import { UpdateUserService } from './update-user.service';

@Controller()
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}
  @Put('/api/melanzane/user/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateUserDto: CreateUserDTO,
  ): Promise<UpdateResult | UserEntity> {
    const UpdateUser = this.updateUserService.execute(uuid, updateUserDto);
    return UpdateUser;
  }
}
