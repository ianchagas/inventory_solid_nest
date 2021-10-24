/* eslint-disable no-param-reassign */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const ProductExists = await this.productRepository.findByUUID(uuid);
    if (!ProductExists) {
      throw new NotFoundException('Produto não existe');
    }
    const ProductId = ProductExists.id;
    return this.productRepository.delete(ProductId);
  }
}
