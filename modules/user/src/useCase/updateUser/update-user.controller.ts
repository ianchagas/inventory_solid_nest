import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from 'modules/shared/src/pipes/uuid.config';
import { CreateUserDTO } from 'modules/user/src/dto/request/create-user.dto';
import { UserEntity } from 'modules/user/src/infra/typeORM/entities/user.entity';

import { UpdateUserService } from './update-user.service';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller()
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}
  @ApiOperation({
    summary: 'Altera as informações de um usuário.',
  })
  @Put('/api/user/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateUserDto: CreateUserDTO,
  ): Promise<UpdateResult | UserEntity> {
    const UpdateUser = this.updateUserService.execute(uuid, updateUserDto);
    return UpdateUser;
  }
}
