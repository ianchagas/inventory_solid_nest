import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FindAllDepositService } from './find-all-deposit.service';

@ApiTags('Depósitos')
@ApiBearerAuth()
@Controller()
export class FindAllDepositController {
  constructor(private findAllDepositService: FindAllDepositService) {}
  @ApiOperation({
    summary: 'Busca todos os depósitos.',
  })
  @Get('/api/melanzane/deposit/find-all')
  async handle(): Promise<DepositEntity[]> {
    return this.findAllDepositService.execute();
  }
}
