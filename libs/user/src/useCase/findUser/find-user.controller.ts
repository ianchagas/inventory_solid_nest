import { Controller, Get, Query } from '@nestjs/common';
import { UserEntity } from '@user/user/infra/typeORM/entities/user.entity';

import { FindUserService } from './find-user.service';

@Controller()
export class FindUserController {
  constructor(private findUserService: FindUserService) {}
  @Get('/api/melanzane/user/find')
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
