import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteUnService } from './delete-un.service';

@Controller()
export class DeleteUnController {
  constructor(private deleteUnService: DeleteUnService) {}
  @Delete('/api/melanzane/un/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteUnService.execute(uuid);
  }
}
