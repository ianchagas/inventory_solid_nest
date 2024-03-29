/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable no-useless-return */
import { UpdateResult } from 'typeorm';

import { MinMaxQuantityDTO } from 'modules/inventory/src/dto/request/min-max-quantity.dto';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

import { IInventoryRepository } from '../../implementations/inventory.interface';
import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { InventoryRepository } from '../../infra/typeORM/repositories/inventory.repository';

interface IRequest {
  ean: string;
  MinMaxQtde: MinMaxQuantityDTO;
}

export class UpdateMinMaxQuantityService {
  constructor(
    @Inject(InventoryRepository)
    private inventoryRepository: IInventoryRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute({
    ean,
    MinMaxQtde,
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

    const UpdateMinMaxQtde =
      await this.inventoryRepository.updateMinMaxQuantity(
        ProductId,
        MinMaxQtde.min_quantity,
        MinMaxQtde.max_quantity,
      );

    return UpdateMinMaxQtde.raw;
  }
}
