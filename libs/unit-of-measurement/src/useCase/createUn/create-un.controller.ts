import { Body, Controller, Post } from '@nestjs/common';

import { UnitOfMeasurementDTO } from '../../dto/request/unit-of-measurement.dto';
import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { CreateUnService } from './create-un.service';

@Controller()
export class CreateUnController {
  constructor(private createUnService: CreateUnService) {}
  @Post('/api/melanzane/un/create')
  async handle(
    @Body() createUnitOfMeasurementDTO: UnitOfMeasurementDTO,
  ): Promise<UnitOfMeasurementEntity> {
    return this.createUnService.execute({ createUnitOfMeasurementDTO });
  }
}
