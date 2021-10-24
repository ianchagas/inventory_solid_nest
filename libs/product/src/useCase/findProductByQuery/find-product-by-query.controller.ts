import { Controller, Get, Query } from '@nestjs/common';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { FindProductByQueryService } from './find-product-by-query.service';

@Controller()
export class FindProductByQueryController {
  constructor(private findProductByQueryService: FindProductByQueryService) {}
  @Get('/api/melanzane/product/find')
  async handle(
    @Query('name') name: string,
    @Query('code') code: string,
    @Query('ean') ean: number,
  ): Promise<ProductEntity[]> {
    return this.findProductByQueryService.execute({
      name,
      code,
      ean,
    });
  }
}
