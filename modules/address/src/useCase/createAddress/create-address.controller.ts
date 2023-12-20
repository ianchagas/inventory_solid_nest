import { AddressDTO } from 'modules/address/src/dto/request/address.dto';
import { AddressEntity } from 'modules/address/src/infra/typeORM/entities/address.entity';
import { uuidOptions } from 'modules/shared/src/pipes/uuid.config';

import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateAddressService } from './create-address.service';

@ApiTags('Endereços')
@ApiBearerAuth()
@Controller()
export class CreateAddressController {
  constructor(private createAddressService: CreateAddressService) {}
  @ApiOperation({
    summary: 'Cria um novo endereço para um cadastro de pessoa existente',
  })
  @Post('/api/address/create/:uuid_people')
  async handle(
    @Param('uuid_people', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() createAddressDTO: AddressDTO,
  ): Promise<AddressEntity> {
    return this.createAddressService.execute({ uuid, createAddressDTO });
  }
}
