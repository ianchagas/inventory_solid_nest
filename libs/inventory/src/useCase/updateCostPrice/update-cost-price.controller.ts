import { UpdateResult } from 'typeorm';

import { CostPriceDTO } from '@inventory/inventory/dto/request/cost-price.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { UpdateCostPriceService } from './update-cost-price.service';

@ApiTags('Gerenciamento de Estoque')
@ApiBearerAuth()
@Controller()
export class UpdateCostPriceController {
  constructor(private updateCostPriceService: UpdateCostPriceService) {}
  @ApiOperation({
    summary: 'Altera o preço de custo do produto.',
  })
  @Put('/api/melanzane/inventory/update-cost-price/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() costPrice: CostPriceDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.updateCostPriceService.execute({ ean, costPrice });
  }
}
