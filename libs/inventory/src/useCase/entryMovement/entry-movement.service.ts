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

import { IInventoryRepository } from '../../implementations/inventory.interface';
import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from '../../infra/typeORM/repositories/inventory.repository';

interface IRequest {
  ean: string;
  entryMovement: InventoryDTO;
}

export class EntryMovementService {
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
    entryMovement,
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

    entryMovement.id_product = ProductId;

    const FindActuallyQuantity =
      await this.inventoryRepository.findActuallyQuantity(ProductId);

    if (!FindActuallyQuantity) {
      const EntryMovement = await this.inventoryRepository.createFirstMovement({
        id_product: entryMovement.id_product,
        quantity: entryMovement.quantity,
        cost_price: entryMovement.cost_price,
      });

      return EntryMovement;
    }

    const Transform = Object.values(FindActuallyQuantity)[0];

    const SumQuantity = entryMovement.quantity + Transform;

    const EntryMovement = await this.inventoryRepository.updateEntryMovement(
      entryMovement.id_product,
      SumQuantity,
      entryMovement.cost_price,
    );

    return EntryMovement.raw;
  }
}
