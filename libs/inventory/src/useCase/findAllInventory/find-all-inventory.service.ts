/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
import { IInventoryRepository } from '@inventory/inventory/implementations/inventory.interface';
import { InventoryRepository } from '@inventory/inventory/infra/typeORM/repositories/inventory.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

@Injectable()
export class FindAllInventoryService {
  constructor(
    @Inject(InventoryRepository)
    private inventoryRepository: IInventoryRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(): Promise<ProductEntity[]> {
    const FindAll = await this.productRepository.findAllWithInventory();
    return FindAll;
  }
}
