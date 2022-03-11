import { DepositDTO } from '@deposit/deposit/dto/request/deposit.dto';
import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateDepositService } from './create-deposit.service';

@ApiTags('Depósitos')
@ApiBearerAuth()
@Controller()
export class CreateDepositController {
  constructor(private createDepositService: CreateDepositService) {}
  @ApiOperation({
    summary: 'Cria o cadastro de um novo depósito.',
  })
  @Post('/api/melanzane/deposit/create')
  async handle(@Body() createDepositDTO: DepositDTO): Promise<DepositEntity> {
    return this.createDepositService.execute({ createDepositDTO });
  }
}
