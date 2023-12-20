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
  exitMovement: InventoryDTO;
}

export class ExitMovementService {
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
    exitMovement,
  }: IRequest): Promise<InventoryEntity | UpdateResult> {
    const ProductExists =
      await GenericValidationIfExistsReturnQuerys.FindProductExistsAndIsEnable(
        ean,
        this.productRepository,
      );

    const ProductId = ProductExists.id;

    exitMovement.id_product = ProductId;

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

    const SubtractQuantity = TransformNumber - exitMovement.quantity;

    if (SubtractQuantity < 0) {
      throw new BadRequestException(
        'Quantidade informada irá deixar o estoque negativo. Não é possível efetuar a movimentação.',
      );
    }

    const ExitMovement = await this.inventoryRepository.updateExitMovement(
      exitMovement.id_product,
      SubtractQuantity,
      exitMovement.cost_price,
    );

    const NewInventoryMovement = await this.inventoryRepository.findInventory(
      ProductId,
    );

    await this.inventoryMovementRepository.createInventoryMovement({
      id_inventory: NewInventoryMovement.id,
      exit_amount_moved: exitMovement.quantity,
      actually_quantity: NewInventoryMovement.quantity,
      actually_cost_price: NewInventoryMovement.cost_price,
    });

    return ExitMovement.raw;
  }
}
