import { Controller, Get } from '@nestjs/common';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { FindAllInventoryService } from './find-all-inventory.service';

@Controller()
export class FindAllInventoryController {
  constructor(private findAllInventory: FindAllInventoryService) {}
  @Get('/api/melanzane/inventory/find-all')
  async handle(): Promise<ProductEntity[]> {
    return this.findAllInventory.execute();
  }
}
