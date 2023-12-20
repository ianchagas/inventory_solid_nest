/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { IInventoryMovementRepository } from 'modules/inventory/src/implementations/inventory-movement.interface';
import { InventoryMovementRepository } from 'modules/inventory/src/infra/typeORM/repositories/inventory-movement.repository';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

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
    const ProductExists =
      await GenericValidationIfExistsReturnQuerys.FindProductExistsAndIsEnable(
        ean,
        this.productRepository,
      );

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
