import { UpdateResult } from 'typeorm';

import { AddressDTO } from '@address/address/dto/request/address.dto';
import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { UpdateAddressService } from './update-address.service';

@Controller()
export class UpdateAddressController {
  constructor(private updateAddressService: UpdateAddressService) {}
  @Put('/api/melanzane/address/update/:uuid_people')
  async handle(
    @Param('uuid_people', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateAddressDTO: AddressDTO,
  ): Promise<UpdateResult> {
    return this.updateAddressService.execute({ uuid, updateAddressDTO });
  }
}
