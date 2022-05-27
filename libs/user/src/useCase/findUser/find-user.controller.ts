import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';

import { FindUserService } from './find-user.service';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller()
export class FindUserController {
  constructor(private findUserService: FindUserService) {}
  @ApiOperation({
    summary: 'Busca usuários através de parâmetros.',
  })
  @Get('/api/user/find')
  async handle(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('admin') admin: boolean,
  ): Promise<UserEntity[]> {
    return this.findUserService.execute({
      name,
      email,
      admin,
    });
  }
}
