import { UpdateResult } from 'typeorm';

import { Controller, Param, Patch } from '@nestjs/common';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { ExitMovementEachOneService } from './exit-movement-each-one.service';

@Controller()
export class ExitMovementEachOneController {
  constructor(private exitMovementEachOneService: ExitMovementEachOneService) {}
  @Patch('/api/melanzane/inventory/exit-movement-each-one/:ean')
  async handle(
    @Param('ean') ean: string,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.exitMovementEachOneService.execute(ean);
  }
}
