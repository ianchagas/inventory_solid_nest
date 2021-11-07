import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, Put } from '@nestjs/common';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { UpdateMinMaxQuantityService } from './update-min-max-quantity.service';

@Controller()
export class UpdateMinMaxQuantityController {
  constructor(
    private updateMinMaxQuantityService: UpdateMinMaxQuantityService,
  ) {}
  @Put('/api/melanzane/inventory/update-min-max-quantity/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() cost_price: number,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.updateMinMaxQuantityService.execute({ ean, cost_price });
  }
}
