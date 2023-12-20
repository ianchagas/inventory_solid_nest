/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
import { IInventoryRepository } from 'modules/inventory/src/implementations/inventory.interface';
import { InventoryRepository } from 'modules/inventory/src/infra/typeORM/repositories/inventory.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';

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
