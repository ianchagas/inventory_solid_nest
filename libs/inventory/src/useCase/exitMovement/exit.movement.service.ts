/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '@inventory/inventory/dto/request/inventory.dto';
import { IInventoryMovementRepository } from '@inventory/inventory/implementations/inventory-movement.interface';
import { InventoryMovementRepository } from '@inventory/inventory/infra/typeORM/repositories/inventory-movement.repository';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

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
        'Estoque desse produto ainda n??o possui moviventa????es, n??o ?? poss??vel retirar uma quantidade.',
      );
    }

    const TransformNumber = Object.values(FindActuallyQuantity)[0];

    if (TransformNumber === 0) {
      throw new BadRequestException(
        'Estoque j?? consta como zerado, n??o ?? poss??vel retirar mais nenhuma quantidade.',
      );
    }

    const SubtractQuantity = TransformNumber - exitMovement.quantity;

    if (SubtractQuantity < 0) {
      throw new BadRequestException(
        'Quantidade informada ir?? deixar o estoque negativo. N??o ?? poss??vel efetuar a movimenta????o.',
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
