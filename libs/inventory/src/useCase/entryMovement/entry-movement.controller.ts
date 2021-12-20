import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '@inventory/inventory/dto/request/inventory.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { EntryMovementService } from './entry-movement.service';

@Controller()
export class EntryMovementController {
  constructor(private entryMovementService: EntryMovementService) {}
  @Put('/api/melanzane/inventory/entry-movement/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() entryMovement: InventoryDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.entryMovementService.execute({ ean, entryMovement });
  }
}
