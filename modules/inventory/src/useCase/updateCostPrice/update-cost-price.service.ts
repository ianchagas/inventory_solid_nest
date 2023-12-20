/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { CostPriceDTO } from 'modules/inventory/src/dto/request/cost-price.dto';
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
  costPrice: CostPriceDTO;
}

export class UpdateCostPriceService {
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
    costPrice,
  }: IRequest): Promise<InventoryEntity | UpdateResult> {
    const ProductExists =
      await GenericValidationIfExistsReturnQuerys.FindProductExistsAndIsEnable(
        ean,
        this.productRepository,
      );

    const ProductId = ProductExists.id;

    const FindMovementExists =
      await this.inventoryRepository.findMovementExists(ProductId);

    if (FindMovementExists.length === 0) {
      throw new BadRequestException(
        'Não existem registros de estoque para o produto, não é possível executar ação.',
      );
    }

    const UpdateCostPrice = await this.inventoryRepository.updateCostPrice(
      ProductId,
      costPrice.cost_price,
    );

    const NewInventoryMovement = await this.inventoryRepository.findInventory(
      ProductId,
    );

    await this.inventoryMovementRepository.createInventoryMovement({
      id_inventory: NewInventoryMovement.id,
      actually_cost_price: NewInventoryMovement.cost_price,
      actually_quantity: NewInventoryMovement.quantity,
    });

    return UpdateCostPrice.raw;
  }
}
