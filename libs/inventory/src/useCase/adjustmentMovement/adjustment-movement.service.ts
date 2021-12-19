/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { InventoryDTO } from '@inventory/inventory/dto/request/inventory.dto';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

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
  ) {}

  async execute({
    ean,
    adjustmentMovement,
  }: IRequest): Promise<InventoryEntity | UpdateResult> {
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

    const AdjustmentMovement =
      await this.inventoryRepository.updateAdjustmentMovement(
        adjustmentMovement.id_product,
        adjustmentMovement.quantity,
        adjustmentMovement.cost_price,
        adjustmentMovement.min_quantity,
        adjustmentMovement.max_quantity,
      );

    return AdjustmentMovement.raw;
  }
}
