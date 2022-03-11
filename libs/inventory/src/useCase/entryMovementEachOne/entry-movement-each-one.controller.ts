import { UpdateResult } from 'typeorm';

import { Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { EntryMovementEachOneService } from './entry-movement-each-one.service';

@ApiTags('Gerenciamento de Estoque')
@ApiBearerAuth()
@Controller()
export class EntryMovementEachOneController {
  constructor(
    private entryMovementEachOneService: EntryMovementEachOneService,
  ) {}
  @ApiOperation({
    summary:
      'Cria um movimento de entrada para uma quantidade a cada vez que há uma bipagem do produto (pelo EAN).',
  })
  @Patch('/api/melanzane/inventory/entry-movement-each-one/:ean')
  async handle(
    @Param('ean') ean: string,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.entryMovementEachOneService.execute(ean);
  }
}
