import { UpdateResult } from 'typeorm';

import { CostPriceDTO } from '@inventory/inventory/dto/request/cost-price.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { UpdateCostPriceService } from './update-cost-price.service';

@Controller()
export class UpdateCostPriceController {
  constructor(private updateCostPriceService: UpdateCostPriceService) {}
  @Put('/api/melanzane/inventory/update-cost-price/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() costPrice: CostPriceDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.updateCostPriceService.execute({ ean, costPrice });
  }
}
