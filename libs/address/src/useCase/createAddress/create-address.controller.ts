import { AddressDTO } from '@address/address/dto/request/address.dto';
import { AddressEntity } from '@address/address/infra/typeORM/entities/address.entity';
import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

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
