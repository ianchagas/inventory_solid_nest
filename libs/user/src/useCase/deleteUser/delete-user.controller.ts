import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteUserService } from './delete-user.service';

@Controller()
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}
  @Delete('/api/melanzane/user/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteUserService.execute(uuid);
  }
}
