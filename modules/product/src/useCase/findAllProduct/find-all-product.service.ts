/* eslint-disable no-param-reassign */
import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';

@Injectable()
export class FindAllProductService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }
}
