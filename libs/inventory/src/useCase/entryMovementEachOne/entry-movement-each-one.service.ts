/* eslint-disable no-useless-return */
import { Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

import { IInventoryRepository } from '../../implementations/inventory.interface';
import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from '../../infra/typeORM/repositories/inventory.repository';

export class EntryMovementEachOneService {
  constructor(
    @Inject(InventoryRepository)
    private inventoryRepository: IInventoryRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(uuid: string): Promise<InventoryEntity> {
    const ProductExists = await this.productRepository.findByUUID(uuid);

    if (!ProductExists) {
      throw new NotFoundException('Produto não existe');
    }
    const ProductId = ProductExists.id;

    return;
  }
}
