import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '@inventory/inventory/dto/request/inventory.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { ExitMovementService } from './exit.movement.service';

@ApiTags('Gerenciamento de Estoque')
@ApiBearerAuth()
@Controller()
export class ExitMovementController {
  constructor(private exitMovementService: ExitMovementService) {}
  @ApiOperation({
    summary: 'Cria um movimento de saída manualmente.',
  })
  @Put('/api/melanzane/inventory/exit-movement/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() exitMovement: InventoryDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.exitMovementService.execute({ ean, exitMovement });
  }
}
