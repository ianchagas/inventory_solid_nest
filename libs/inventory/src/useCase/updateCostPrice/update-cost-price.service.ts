/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { CostPriceDTO } from '@inventory/inventory/dto/request/cost-price.dto';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

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
  ) {}

  async execute({
    ean,
    costPrice,
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

    return UpdateCostPrice.raw;
  }
}
