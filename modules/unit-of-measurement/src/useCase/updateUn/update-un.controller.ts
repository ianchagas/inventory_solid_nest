import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from 'modules/shared/src/pipes/uuid.config';

import { UnitOfMeasurementDTO } from '../../dto/request/unit-of-measurement.dto';
import { UpdateUnService } from './update-un.service';

@ApiTags('Unidades de Medida')
@ApiBearerAuth()
@Controller()
export class UpdateUnController {
  constructor(private updateUnService: UpdateUnService) {}
  @ApiOperation({
    summary: 'Altera as informações da unidade de medida.',
  })
  @Put('/api/un/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateUnDTO: UnitOfMeasurementDTO,
  ): Promise<UpdateResult> {
    return this.updateUnService.execute({ uuid, updateUnDTO });
  }
}
