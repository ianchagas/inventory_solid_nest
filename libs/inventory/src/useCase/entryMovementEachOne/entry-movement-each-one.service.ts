/* eslint-disable no-multi-assign */
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

  async execute(ean: string): Promise<InventoryEntity> {
    const ProductExists = await this.productRepository.findByEan(ean);

    if (!ProductExists) {
      throw new NotFoundException('Produto não existe');
    }

    const ProductId = ProductExists.id;

    const FindActuallyQuantity =
      await this.inventoryRepository.findActuallyQuantity(ProductId);

    if (!FindActuallyQuantity) {
      const Transform = 0;

      const SumQuantity = Transform + 1;

      const EntryMovementEachOne =
        await this.inventoryRepository.entryMovementEachOne({
          id_product: ProductId,
          quantity: SumQuantity,
        });
      return EntryMovementEachOne;
    }

    console.log(FindActuallyQuantity);
    const SumQuantity = Object.values(FindActuallyQuantity)[0] + 1;

    console.log(SumQuantity);

    // const EntryMovementEachOne =
    //   await this.inventoryRepository.entryMovementEachOne({
    //     id_product: ProductId,
    //     quantity: SumQuantity,
    //   });

    return;
  }
}
