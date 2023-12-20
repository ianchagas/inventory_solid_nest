import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeopleEntity } from 'modules/people/src/infra/typeORM/entities/people.entity';

import { FindAllPeopleService } from './find-all-people.service';

@ApiTags('Pessoas/Fornecedores')
@ApiBearerAuth()
@Controller()
export class FindAllPeopleController {
  constructor(private findAllPeopleService: FindAllPeopleService) {}
  @ApiOperation({
    summary: 'Lista todas as entidades cadastradas.',
  })
  @Get('/api/people/find-all')
  async handle(): Promise<PeopleEntity[]> {
    return this.findAllPeopleService.execute();
  }
}
