import { Inject, Injectable } from '@nestjs/common';
import { ProductDTO } from '@product/product/dto/request/product.dto';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

interface IRequest {
  createProductDTO: ProductDTO;
}

@Injectable()
export class CreateProductService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute({ createProductDTO }: IRequest): Promise<ProductEntity> {
    const CreateProduct = createProductDTO;

    return this.productRepository.create(CreateProduct);
  }
}
