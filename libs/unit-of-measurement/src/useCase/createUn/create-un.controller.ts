import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UnitOfMeasurementDTO } from '../../dto/request/unit-of-measurement.dto';
import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { CreateUnService } from './create-un.service';

@ApiTags('Unidades de Medida')
@ApiBearerAuth()
@Controller()
export class CreateUnController {
  constructor(private createUnService: CreateUnService) {}
  @ApiOperation({
    summary: 'Cria a informação para uma unidade de medida.',
  })
  @Post('/api/melanzane/un/create')
  async handle(
    @Body() createUnitOfMeasurementDTO: UnitOfMeasurementDTO,
  ): Promise<UnitOfMeasurementEntity> {
    return this.createUnService.execute({ createUnitOfMeasurementDTO });
  }
}
