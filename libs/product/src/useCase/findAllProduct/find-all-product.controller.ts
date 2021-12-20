import { Controller, Get } from '@nestjs/common';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { FindAllProductService } from './find-all-product.service';

@Controller()
export class FindAllProductController {
  constructor(private findAllProductService: FindAllProductService) {}
  @Get('/api/melanzane/product/find-all')
  async handle(): Promise<ProductEntity[]> {
    return this.findAllProductService.execute();
  }
}
