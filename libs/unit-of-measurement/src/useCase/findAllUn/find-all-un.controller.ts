import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { FindAllUnService } from './find-all-un.service';

@ApiTags('Unidades de Medida')
@ApiBearerAuth()
@Controller()
export class FindAllUnController {
  constructor(private findAllUnService: FindAllUnService) {}
  @ApiOperation({
    summary: 'Lista todas as unidades de medida.',
  })
  @Get('/api/melanzane/un/find-all')
  async handle(): Promise<UnitOfMeasurementEntity[]> {
    return this.findAllUnService.execute();
  }
}
