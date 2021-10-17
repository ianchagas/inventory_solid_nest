import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeletePeopleService } from './delete-people.service';

@Controller()
export class DeletePeopleController {
  constructor(private deletePeopleService: DeletePeopleService) {}
  @Delete('/api/melanzane/people/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deletePeopleService.execute(uuid);
  }
}
