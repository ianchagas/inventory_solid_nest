import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from 'modules/shared/src/pipes/uuid.config';

import { DeleteUnService } from './delete-un.service';

@ApiTags('Unidades de Medida')
@ApiBearerAuth()
@Controller()
export class DeleteUnController {
  constructor(private deleteUnService: DeleteUnService) {}
  @ApiOperation({
    summary: 'Deleta uma unidade de medida.',
  })
  @Delete('/api/un/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteUnService.execute(uuid);
  }
}
