import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteDepositService } from './delete-deposit.service';

@Controller()
export class DeleteDepositController {
  constructor(private deleteDepositService: DeleteDepositService) {}
  @Delete('/api/melanzane/deposit/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteDepositService.execute(uuid);
  }
}
