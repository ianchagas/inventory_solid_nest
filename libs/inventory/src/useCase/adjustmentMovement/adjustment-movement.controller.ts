import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '@inventory/inventory/dto/request/inventory.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { AdjustmentMovementService } from './adjustment-movement.service';

@Controller()
export class AdjustmentMovementController {
  constructor(private adjustmentMovementService: AdjustmentMovementService) {}
  @Put('/api/melanzane/inventory/adjustment-movement/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() adjustmentMovement: InventoryDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.adjustmentMovementService.execute({ ean, adjustmentMovement });
  }
}
