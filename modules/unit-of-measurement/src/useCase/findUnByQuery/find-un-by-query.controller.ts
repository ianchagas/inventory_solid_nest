import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { FindUnByQueryService } from './find-un-by-query.service';

@ApiTags('Unidades de Medida')
@ApiBearerAuth()
@Controller()
export class FindUnByQueryController {
  constructor(private findUnByQueryService: FindUnByQueryService) {}
  @ApiOperation({
    summary: 'Busca as unidades de medida através dos parâmetros.',
  })
  @Get('/api/un/find')
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
