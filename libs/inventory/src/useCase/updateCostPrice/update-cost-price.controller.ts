import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, Put } from '@nestjs/common';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { UpdateCostPriceService } from './update-cost-price.service';

@Controller()
export class UpdateCostPriceController {
  constructor(private updateCostPriceService: UpdateCostPriceService) {}
  @Put('/api/melanzane/inventory/update-cost-price/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() cost_price: number,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.updateCostPriceService.execute({ ean, cost_price });
  }
}
