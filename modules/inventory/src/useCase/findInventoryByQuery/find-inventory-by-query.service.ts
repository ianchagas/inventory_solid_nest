/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
import { QueryInventoryDTO } from 'modules/inventory/src/dto/request/query-inventory.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';

@Injectable()
export class FindInventoryByQueryService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(
    queryInventoryDto: QueryInventoryDTO,
  ): Promise<ProductEntity[]> {
    return this.productRepository.findByQueryWithInventory(queryInventoryDto);
  }
}
