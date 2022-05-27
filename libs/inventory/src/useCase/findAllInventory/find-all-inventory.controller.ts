import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { FindAllInventoryService } from './find-all-inventory.service';

@ApiTags('Gerenciamento de Estoque')
@Controller()
export class FindAllInventoryController {
  constructor(private findAllInventory: FindAllInventoryService) {}
  @ApiOperation({
    summary: 'Busca todos os produtos com informações do estoque atual.',
  })
  @Get('/api/inventory/find-all')
  async handle(): Promise<ProductEntity[]> {
    return this.findAllInventory.execute();
  }
}
