import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from 'modules/shared/src/pipes/uuid.config';

import { DeleteUserService } from './delete-user.service';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller()
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}
  @ApiOperation({
    summary: 'Deleta um usuário.',
  })
  @Delete('/api/user/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteUserService.execute(uuid);
  }
}
