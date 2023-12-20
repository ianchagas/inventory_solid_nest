/* eslint-disable no-param-reassign */
import { IInventoryRepository } from 'modules/inventory/src/implementations/inventory.interface';
import { InventoryRepository } from 'modules/inventory/src/infra/typeORM/repositories/inventory.repository';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
    @Inject(InventoryRepository)
    private inventoryRepository: IInventoryRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const ProductExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.productRepository,
      );

    const ProductId = ProductExists.id;

    const InventoryExists = await this.inventoryRepository.findMovementExists(
      ProductId,
    );

    if (InventoryExists) {
      throw new BadRequestException(
        'Já existem registros de movimentação de estoque para esse produto. Ao invés de excluir você deverá desativar.',
      );
    }

    return this.productRepository.delete(ProductId);
  }
}
