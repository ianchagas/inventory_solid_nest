import { UpdateResult } from 'typeorm';

import { DepositDTO } from '@deposit/deposit/dto/request/deposit.dto';
import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { UpdateDepositService } from './update-deposit.service';

@ApiTags('Depósitos')
@ApiBearerAuth()
@Controller()
export class UpdateDepositController {
  constructor(private updateDepositService: UpdateDepositService) {}
  @ApiOperation({
    summary: 'Altera as informações de um depósito.',
  })
  @Put('/api/melanzane/deposit/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateDepositDTO: DepositDTO,
  ): Promise<UpdateResult> {
    return this.updateDepositService.execute({ uuid, updateDepositDTO });
  }
}
