import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { Controller, Get } from '@nestjs/common';

import { FindAllDepositService } from './find-all-deposit.service';

@Controller()
export class FindAllDepositController {
  constructor(private findAllDepositService: FindAllDepositService) {}
  @Get('/api/melanzane/deposit/find-all')
  async handle(): Promise<DepositEntity[]> {
    return this.findAllDepositService.execute();
  }
}
