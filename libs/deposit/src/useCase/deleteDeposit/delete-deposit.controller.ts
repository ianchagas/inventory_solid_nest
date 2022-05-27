import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteDepositService } from './delete-deposit.service';

@ApiTags('Depósitos')
@ApiBearerAuth()
@Controller()
export class DeleteDepositController {
  constructor(private deleteDepositService: DeleteDepositService) {}
  @ApiOperation({
    summary: 'Deleta o cadastro de um depósito.',
  })
  @Delete('/api/deposit/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteDepositService.execute(uuid);
  }
}
