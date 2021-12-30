/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { IInventoryMovementRepository } from '@inventory/inventory/implementations/inventory-movement.interface';
import { InventoryMovementRepository } from '@inventory/inventory/infra/typeORM/repositories/inventory-movement.repository';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
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
    @Inject(InventoryMovementRepository)
    private inventoryMovementRepository: IInventoryMovementRepository,
  ) {}

  async execute(ean: string): Promise<InventoryEntity | UpdateResult> {
    const ProductExists = await this.productRepository.findByEan(ean);

    if (!ProductExists) {
      throw new NotFoundException('Produto não existe');
    }

    if (ProductExists.enable === false) {
      throw new BadRequestException(
        'Este produto encontra-se desativado, não é possível movimentar estoque.',
      );
    }

    const ProductId = ProductExists.id;

    const FindActuallyQuantity =
      await this.inventoryRepository.findActuallyQuantity(ProductId);

    if (!FindActuallyQuantity) {
      const Transform = 0;

      const SumQuantity = Transform + 1;

      const EntryMovementEachOne =
        await this.inventoryRepository.createFirstMovement({
          id_product: ProductId,
          quantity: SumQuantity,
        });

      await this.inventoryMovementRepository.createInventoryMovement({
        id_inventory: EntryMovementEachOne.id,
        entry_amount_moved: 1,
        actually_quantity: EntryMovementEachOne.quantity,
      });

      return EntryMovementEachOne;
    }

    const SumQuantity = Object.values(FindActuallyQuantity)[0] + 1;

    const EntryMovementEachOne =
      await this.inventoryRepository.updateEntryMovementEachOne(
        ProductId,
        SumQuantity,
      );

    const NewInventoryMovement = await this.inventoryRepository.findInventory(
      ProductId,
    );

    await this.inventoryMovementRepository.createInventoryMovement({
      id_inventory: NewInventoryMovement.id,
      entry_amount_moved: 1,
      actually_quantity: NewInventoryMovement.quantity,
      actually_cost_price: NewInventoryMovement.cost_price,
    });

    return EntryMovementEachOne.raw;
  }
}
