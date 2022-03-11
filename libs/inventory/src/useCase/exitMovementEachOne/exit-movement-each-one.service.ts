/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { IInventoryMovementRepository } from '@inventory/inventory/implementations/inventory-movement.interface';
import { InventoryMovementRepository } from '@inventory/inventory/infra/typeORM/repositories/inventory-movement.repository';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

import { IInventoryRepository } from '../../implementations/inventory.interface';
import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from '../../infra/typeORM/repositories/inventory.repository';

export class ExitMovementEachOneService {
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
      throw new BadRequestException(
        'Estoque desse produto ainda não possui moviventações, não é possível retirar uma quantidade.',
      );
    }

    const TransformNumber = Object.values(FindActuallyQuantity)[0];

    if (TransformNumber === 0) {
      throw new BadRequestException(
        'Estoque já consta como zerado, não é possível retirar mais nenhuma quantidade.',
      );
    }

    const SubtractQuantity = TransformNumber - 1;

    const ExitMovementEachOne =
      await this.inventoryRepository.updateExitMovementEachOne(
        ProductId,
        SubtractQuantity,
      );

    const NewInventoryMovement = await this.inventoryRepository.findInventory(
      ProductId,
    );

    await this.inventoryMovementRepository.createInventoryMovement({
      id_inventory: NewInventoryMovement.id,
      exit_amount_moved: 1,
      actually_quantity: NewInventoryMovement.quantity,
      actually_cost_price: NewInventoryMovement.cost_price,
    });

    return ExitMovementEachOne.raw;
  }
}
