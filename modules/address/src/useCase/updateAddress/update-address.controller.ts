import { AddressDTO } from 'modules/address/src/dto/request/address.dto';
import { uuidOptions } from 'modules/shared/src/pipes/uuid.config';
import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
