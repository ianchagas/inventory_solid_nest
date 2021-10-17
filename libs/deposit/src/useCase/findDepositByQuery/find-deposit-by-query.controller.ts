import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { Controller, Get, Query } from '@nestjs/common';

import { FindDepositByQueryService } from './find-deposit-by-query.service';

@Controller()
export class FindDepositByQueryController {
  constructor(private findDepositByQueryService: FindDepositByQueryService) {}
  @Get('/api/melanzane/deposit/find')
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
