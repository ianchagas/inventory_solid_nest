import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';

import { FindProductByQueryService } from './find-product-by-query.service';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller()
export class FindProductByQueryController {
  constructor(private findProductByQueryService: FindProductByQueryService) {}
  @ApiOperation({
    summary: 'Busca e lista os produtos através de parâmetros.',
  })
  @Get('/api/product/find')
  async handle(
    @Query('name') name: string,
    @Query('code') code: string,
    @Query('ean') ean: string,
  ): Promise<ProductEntity[]> {
    return this.findProductByQueryService.execute({
      name,
      code,
      ean,
    });
  }
}
