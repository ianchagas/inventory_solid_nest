/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

import { IInventoryRepository } from '../../implementations/inventory.interface';
import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from '../../infra/typeORM/repositories/inventory.repository';

export class ExitMovementEachOneService {
  constructor(
    @Inject(InventoryRepository)
    private inventoryRepository: IInventoryRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(ean: string): Promise<InventoryEntity | UpdateResult> {
    const ProductExists = await this.productRepository.findByEan(ean);

    if (!ProductExists) {
      throw new NotFoundException('Produto não existe.');
    }

    if (ProductExists.enable === false) {
      throw new BadRequestException(
        'Este produto encontra-se desativado, não é possível movimentar estoque.',
      );
    }

    const ProductId = ProductExists.id;

    const FindActuallyQuantity =
      await this.inventoryRepository.findActuallyQuantity(ProductId);

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

    return ExitMovementEachOne;
  }
}
