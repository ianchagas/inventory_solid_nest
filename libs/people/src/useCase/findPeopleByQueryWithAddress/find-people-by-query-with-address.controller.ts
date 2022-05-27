import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { FindPeopleByQueryWithAddressService } from './find-people-by-query-with-address.service';

@ApiTags('Pessoas/Fornecedores')
@ApiBearerAuth()
@Controller()
export class FindPeopleByQueryWithAddressController {
  constructor(
    private findPeopleByQueryWithAddressService: FindPeopleByQueryWithAddressService,
  ) {}
  @ApiOperation({
    summary:
      'Lista as entidades através de parâmetros, trazendo também informações do endereço.',
  })
  @Get('/api/people/find-with-address')
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
