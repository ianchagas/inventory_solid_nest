import { Controller, Get } from '@nestjs/common';

import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { FindAllUnService } from './find-all-un.service';

@Controller()
export class FindAllUnController {
  constructor(private findAllUnService: FindAllUnService) {}
  @Get('/api/melanzane/un/find-all')
  async handle(): Promise<UnitOfMeasurementEntity[]> {
    return this.findAllUnService.execute();
  }
}
