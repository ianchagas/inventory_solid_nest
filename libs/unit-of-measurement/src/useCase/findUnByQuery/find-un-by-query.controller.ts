import { Controller, Get, Query } from '@nestjs/common';

import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { FindUnByQueryService } from './find-un-by-query.service';

@Controller()
export class FindUnByQueryController {
  constructor(private findUnByQueryService: FindUnByQueryService) {}
  @Get('/api/melanzane/un/find')
  async handle(
    @Query('id') id: number,
    @Query('uuid') uuid: string,
    @Query('description') description: string,
    @Query('initials') initials: string,
  ): Promise<UnitOfMeasurementEntity[]> {
    return this.findUnByQueryService.execute({
      id,
      uuid,
      description,
      initials,
    });
  }
}
