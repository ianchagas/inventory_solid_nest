/* eslint-disable no-useless-return */
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from '@product/product/dto/request/product.dto';
import { IProductRepository } from '@product/product/implementations/product.interface';

import { ProductEntity } from '../entities/product.entity';

@Injectable()
class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProduct: ProductDTO): Promise<ProductEntity> {
    const CreateProduct = this.productRepository.create(createProduct);

    const SaveProduct = await this.productRepository.save(CreateProduct);

    return SaveProduct;
  }
}

export { ProductRepository };
