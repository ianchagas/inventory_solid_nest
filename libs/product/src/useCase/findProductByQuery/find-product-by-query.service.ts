/* eslint-disable no-param-reassign */
import { Inject, Injectable } from '@nestjs/common';
import { QueryProductDTO } from '@product/product/dto/request/query-product.dto';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

@Injectable()
export class FindProductByQueryService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(queryProduct: QueryProductDTO): Promise<ProductEntity[]> {
    return this.productRepository.findByQuery(queryProduct);
  }
}
