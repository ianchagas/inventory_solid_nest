import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';

import { FindInventoryByQueryService } from './find-inventory-by-query.service';

@ApiTags('Gerenciamento de Estoque')
@Controller()
export class FindInventoryByQueryController {
  constructor(private findInventoryByQuery: FindInventoryByQueryService) {}
  @ApiOperation({
    summary:
      'Busca os produtos com informações do estoque através de parâmetros do estoque.',
  })
  @Get('/api/inventory/find')
  async handle(
    @Query('name') name: string,
    @Query('code') code: string,
    @Query('ean') ean: string,
    @Query('enable') enable: boolean,
    @Query('quantity') quantity: number,
    @Query('cost_price') cost_price: number,
  ): Promise<ProductEntity[]> {
    return this.findInventoryByQuery.execute({
      name,
      code,
      ean,
      enable,
      quantity,
      cost_price,
    });
  }
}
