import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteAddressService } from './delete-address.service';

@Controller()
export class DeleteAddressController {
  constructor(private deleteAddressService: DeleteAddressService) {}
  @Delete('/api/melanzane/address/delete/:uuid_people')
  async handle(
    @Param('uuid_people', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteAddressService.execute(uuid);
  }
}
