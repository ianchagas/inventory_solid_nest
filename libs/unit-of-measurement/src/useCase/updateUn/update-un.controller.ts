import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { UnitOfMeasurementDTO } from '../../dto/request/unit-of-measurement.dto';
import { UpdateUnService } from './update-un.service';

@Controller()
export class UpdateUnController {
  constructor(private updateUnService: UpdateUnService) {}
  @Put('/api/melanzane/un/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateUnDTO: UnitOfMeasurementDTO,
  ): Promise<UpdateResult> {
    return this.updateUnService.execute({ uuid, updateUnDTO });
  }
}
