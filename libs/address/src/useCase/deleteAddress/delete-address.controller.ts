import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteAddressService } from './delete-address.service';

@ApiTags('Endereços')
@ApiBearerAuth()
@Controller()
export class DeleteAddressController {
  constructor(private deleteAddressService: DeleteAddressService) {}
  @ApiOperation({
    summary: 'Delete o endereço de uma pessoa',
  })
  @Delete('/api/address/delete/:uuid_people')
  async handle(
    @Param('uuid_people', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteAddressService.execute(uuid);
  }
}
