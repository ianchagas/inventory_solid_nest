/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { InventoryDTO } from 'modules/inventory/src/dto/request/inventory.dto';
import { IInventoryMovementRepository } from 'modules/inventory/src/implementations/inventory-movement.interface';
import { InventoryMovementRepository } from 'modules/inventory/src/infra/typeORM/repositories/inventory-movement.repository';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

import { IInventoryRepository } from '../../implementations/inventory.interface';
import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from '../../infra/typeORM/repositories/inventory.repository';

interface IRequest {
  ean: string;
  adjustmentMovement: InventoryDTO;
}

export class AdjustmentMovementService {
  constructor(
    @Inject(InventoryRepository)
    private inventoryRepository: IInventoryRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
    @Inject(InventoryMovementRepository)
    private inventoryMovementRepository: IInventoryMovementRepository,
  ) {}

  async execute({
    ean,
    adjustmentMovement,
  }: IRequest): Promise<InventoryEntity | UpdateResult> {
    const ProductExists =
      await GenericValidationIfExistsReturnQuerys.FindProductExistsAndIsEnable(
        ean,
        this.productRepository,
      );

    const ProductId = ProductExists.id;

    adjustmentMovement.id_product = ProductId;

    const FindActuallyQuantity =
      await this.inventoryRepository.findActuallyQuantity(ProductId);

    if (!FindActuallyQuantity) {
      const AdjustmentMovement =
        await this.inventoryRepository.createFirstMovement({
          id_product: adjustmentMovement.id_product,
          quantity: adjustmentMovement.quantity,
          cost_price: adjustmentMovement.cost_price,
          max_quantity: adjustmentMovement.max_quantity,
          min_quantity: adjustmentMovement.min_quantity,
        });

      return AdjustmentMovement;
    }

    const Transform = Object.values(FindActuallyQuantity)[0];

    const AdjustmentMovement =
      await this.inventoryRepository.updateAdjustmentMovement(
        adjustmentMovement.id_product,
        adjustmentMovement.quantity,
        adjustmentMovement.cost_price,
        adjustmentMovement.min_quantity,
        adjustmentMovement.max_quantity,
      );

    const NewInventoryMovement = await this.inventoryRepository.findInventory(
      ProductId,
    );

    if (adjustmentMovement.quantity > Transform) {
      const EntryAmount = adjustmentMovement.quantity - Transform;
      await this.inventoryMovementRepository.createInventoryMovement({
        id_inventory: NewInventoryMovement.id,
        entry_amount_moved: EntryAmount,
        actually_quantity: NewInventoryMovement.quantity,
        actually_cost_price: NewInventoryMovement.cost_price,
      });
    }

    if (adjustmentMovement.quantity < Transform) {
      const ExitAmount = Transform - adjustmentMovement.quantity;
      await this.inventoryMovementRepository.createInventoryMovement({
        id_inventory: NewInventoryMovement.id,
        exit_amount_moved: ExitAmount,
        actually_quantity: NewInventoryMovement.quantity,
        actually_cost_price: NewInventoryMovement.cost_price,
      });
    }

    return AdjustmentMovement.raw;
  }
}
