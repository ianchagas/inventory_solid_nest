/* eslint-disable no-param-reassign */
import { IInventoryRepository } from '@inventory/inventory/implementations/inventory.interface';
import { InventoryRepository } from '@inventory/inventory/infra/typeORM/repositories/inventory.repository';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
    @Inject(InventoryRepository)
    private inventoryRepository: IInventoryRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const ProductExists = await this.productRepository.findByUUID(uuid);

    if (!ProductExists) {
      throw new NotFoundException('Produto não existe');
    }

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
