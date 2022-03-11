import { UpdateResult } from 'typeorm';

import { Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { ExitMovementEachOneService } from './exit-movement-each-one.service';

@ApiTags('Gerenciamento de Estoque')
@ApiBearerAuth()
@Controller()
export class ExitMovementEachOneController {
  constructor(private exitMovementEachOneService: ExitMovementEachOneService) {}
  @ApiOperation({
    summary:
      'Cria um movimento de saída de uma quantidade a cada vez que há uma bipagem do produto (pelo EAN).',
  })
  @Patch('/api/melanzane/inventory/exit-movement-each-one/:ean')
  async handle(
    @Param('ean') ean: string,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.exitMovementEachOneService.execute(ean);
  }
}
