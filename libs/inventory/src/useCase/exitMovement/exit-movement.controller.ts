import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '@inventory/inventory/dto/request/inventory.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { ExitMovementService } from './exit.movement.service';

@Controller()
export class ExitMovementController {
  constructor(private exitMovementService: ExitMovementService) {}
  @Put('/api/melanzane/inventory/exit-movement/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() exitMovement: InventoryDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.exitMovementService.execute({ ean, exitMovement });
  }
}
