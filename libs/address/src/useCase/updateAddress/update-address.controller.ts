import { UpdateResult } from 'typeorm';

import { AddressDTO } from '@address/address/dto/request/address.dto';
import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { UpdateAddressService } from './update-address.service';

@ApiTags('Endereços')
@ApiBearerAuth()
@Controller()
export class UpdateAddressController {
  constructor(private updateAddressService: UpdateAddressService) {}
  @ApiOperation({
    summary: 'Altera o endereço de uma pessoa',
  })
  @Put('/api/address/update/:uuid_people')
  async handle(
    @Param('uuid_people', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateAddressDTO: AddressDTO,
  ): Promise<UpdateResult> {
    return this.updateAddressService.execute({ uuid, updateAddressDTO });
  }
}
