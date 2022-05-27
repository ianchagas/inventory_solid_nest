import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeletePeopleService } from './delete-people.service';

@ApiTags('Pessoas/Fornecedores')
@ApiBearerAuth()
@Controller()
export class DeletePeopleController {
  constructor(private deletePeopleService: DeletePeopleService) {}
  @ApiOperation({
    summary: 'Deleta uma entidade.',
  })
  @Delete('/api/people/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deletePeopleService.execute(uuid);
  }
}
