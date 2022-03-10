import { Controller, Get, Query } from '@nestjs/common';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { FindPeopleByQueryWithAddressService } from './find-people-by-query-with-address.service';

@Controller()
export class FindPeopleByQueryWithAddressController {
  constructor(
    private findPeopleByQueryWithAddressService: FindPeopleByQueryWithAddressService,
  ) {}
  @Get('/api/melanzane/people/find-with-address')
  async handle(
    @Query('id') id: number,
    @Query('uuid') uuid: string,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('cpf') cpf: string,
    @Query('cnpj') cnpj: string,
    @Query('ie') ie: string,
    @Query('corporate_name') corporate_name: string,
    @Query('fantasy_name') fantasy_name: string,
    @Query('comments') comments: string,
  ): Promise<PeopleEntity[]> {
    return this.findPeopleByQueryWithAddressService.execute({
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
