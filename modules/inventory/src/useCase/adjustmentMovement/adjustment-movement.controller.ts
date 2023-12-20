import { UpdateResult } from 'typeorm';

import { InventoryDTO } from 'modules/inventory/src/dto/request/inventory.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { AdjustmentMovementService } from './adjustment-movement.service';

@ApiTags('Gerenciamento de Estoque')
@ApiBearerAuth()
@Controller()
export class AdjustmentMovementController {
  constructor(private adjustmentMovementService: AdjustmentMovementService) {}
  @ApiOperation({
    summary: 'Cria um movimento de ajuste.',
  })
  @Put('/api/inventory/adjustment-movement/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() adjustmentMovement: InventoryDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.adjustmentMovementService.execute({ ean, adjustmentMovement });
  }
}
