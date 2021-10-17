import { Controller, Get, Query } from '@nestjs/common';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { FindPeopleByQueryService } from './find-people-by-query.service';

@Controller()
export class FindPeopleByQueryController {
  constructor(private findPeopleByQueryService: FindPeopleByQueryService) {}
  @Get('/api/melanzane/people/find')
  async handle(
    @Query('id') id: number,
    @Query('uuid') uuid: string,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('cpf') cpf: number,
    @Query('cnpj') cnpj: number,
    @Query('ie') ie: number,
    @Query('corporate_name') corporate_name: string,
    @Query('fantasy_name') fantasy_name: string,
    @Query('comments') comments: string,
  ): Promise<PeopleEntity[]> {
    return this.findPeopleByQueryService.execute({
      id,
      uuid,
      name,
      email,
      cpf,
      cnpj,
      ie,
      corporate_name,
      fantasy_name,
      comments,
    });
  }
}
