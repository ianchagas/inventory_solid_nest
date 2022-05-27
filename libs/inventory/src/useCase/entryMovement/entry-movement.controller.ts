import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '@inventory/inventory/dto/request/inventory.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { EntryMovementService } from './entry-movement.service';

@ApiTags('Gerenciamento de Estoque')
@ApiBearerAuth()
@Controller()
export class EntryMovementController {
  constructor(private entryMovementService: EntryMovementService) {}
  @ApiOperation({
    summary: 'Cria um movimento de entrada manualmente.',
  })
  @Put('/api/inventory/entry-movement/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() entryMovement: InventoryDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.entryMovementService.execute({ ean, entryMovement });
  }
}
