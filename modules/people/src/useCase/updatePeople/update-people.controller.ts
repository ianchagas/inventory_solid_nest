import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePeopleDTO } from 'modules/people/src/dto/request/update-people.dto';
import { uuidOptions } from 'modules/shared/src/pipes/uuid.config';

import { UpdatePeopleService } from './update-people.service';

@ApiTags('Pessoas/Fornecedores')
@ApiBearerAuth()
@Controller()
export class UpdatePeopleController {
  constructor(private updatePeopleService: UpdatePeopleService) {}
  @ApiOperation({
    summary: 'Altera as informações da entidade.',
  })
  @Put('/api/people/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updatePeopleDTO: UpdatePeopleDTO,
  ): Promise<UpdateResult> {
    return this.updatePeopleService.execute({ uuid, updatePeopleDTO });
  }
}
