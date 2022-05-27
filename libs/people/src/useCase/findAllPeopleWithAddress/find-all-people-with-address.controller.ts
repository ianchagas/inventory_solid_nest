import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { FindAllPeopleWithAddressService } from './find-all-people-with-address.service';

@ApiTags('Pessoas/Fornecedores')
@ApiBearerAuth()
@Controller()
export class FindAllPeopleWithAddressController {
  constructor(
    private findAllPeopleWithAddressService: FindAllPeopleWithAddressService,
  ) {}
  @ApiOperation({
    summary:
      'Lista todas as entidades cadastradas trazendo também informações do endereço.',
  })
  @Get('/api/people/find-all-with-address')
  async handle(): Promise<PeopleEntity[]> {
    return this.findAllPeopleWithAddressService.execute();
  }
}
