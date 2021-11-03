import { Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { EntryMovementEachOneService } from './entry-movement-each-one.service';

@Controller()
export class EntryMovementEachOneController {
  constructor(
    private entryMovementEachOneService: EntryMovementEachOneService,
  ) {}
  @Patch('/api/melanzane/inventory/entry-movement-each-one/:ean')
  async handle(@Param('ean') ean: string): Promise<InventoryEntity> {
    return this.entryMovementEachOneService.execute(ean);
  }
}
