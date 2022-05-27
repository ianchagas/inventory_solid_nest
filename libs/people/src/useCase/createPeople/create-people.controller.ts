import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePeopleDTO } from '@people/people/dto/request/create-people.dto';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { CreatePeopleService } from './create-people.service';

@ApiTags('Pessoas/Fornecedores')
@ApiBearerAuth()
@Controller()
export class CreatePeopleController {
  constructor(private createPeopleService: CreatePeopleService) {}
  @ApiOperation({
    summary: 'Cria um cadastro de uma entidade.',
  })
  @Post('/api/people/create')
  async handle(
    @Body() createPeopleDTO: CreatePeopleDTO,
  ): Promise<PeopleEntity> {
    return this.createPeopleService.execute({ createPeopleDTO });
  }
}
