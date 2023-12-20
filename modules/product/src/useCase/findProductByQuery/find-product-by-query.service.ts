/* eslint-disable no-param-reassign */
import { Inject, Injectable } from '@nestjs/common';
import { QueryProductDTO } from 'modules/product/src/dto/request/query-product.dto';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';

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
