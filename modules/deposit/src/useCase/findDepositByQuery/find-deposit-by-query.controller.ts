import { DepositEntity } from 'modules/deposit/src/infra/typeORM/entities/deposit.entity';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FindDepositByQueryService } from './find-deposit-by-query.service';

@ApiTags('Depósitos')
@ApiBearerAuth()
@Controller()
export class FindDepositByQueryController {
  constructor(private findDepositByQueryService: FindDepositByQueryService) {}
  @ApiOperation({
    summary: 'Busca os depósitos através de parâmetros.',
  })
  @Get('/api/deposit/find')
  async handle(
    @Query('id') id: number,
    @Query('uuid') uuid: string,
    @Query('name') name: string,
  ): Promise<DepositEntity[]> {
    return this.findDepositByQueryService.execute({
      id,
      uuid,
      name,
    });
  }
}
