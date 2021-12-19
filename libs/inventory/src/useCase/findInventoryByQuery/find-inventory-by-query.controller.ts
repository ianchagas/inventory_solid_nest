import { Controller, Get, Query } from '@nestjs/common';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { FindInventoryByQueryService } from './find-inventory-by-query.service';

@Controller()
export class FindInventoryByQueryController {
  constructor(private findInventoryByQuery: FindInventoryByQueryService) {}
  @Get('/api/melanzane/inventory/find')
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
