/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
import { QueryInventoryDTO } from '@inventory/inventory/dto/request/query-inventory.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

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
