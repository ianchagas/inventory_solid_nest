import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { FindAllProductService } from './find-all-product.service';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller()
export class FindAllProductController {
  constructor(private findAllProductService: FindAllProductService) {}
  @ApiOperation({
    summary: 'Lista todos os produtos.',
  })
  @Get('/api/product/find-all')
  async handle(): Promise<ProductEntity[]> {
    return this.findAllProductService.execute();
  }
}
