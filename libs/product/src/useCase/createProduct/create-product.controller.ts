import { Body, Controller, Post } from '@nestjs/common';
import { ProductDTO } from '@product/product/dto/request/product.dto';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { CreateProductService } from './create-product.service';

@Controller()
export class CreateProductController {
  constructor(private createProductService: CreateProductService) {}
  @Post('/api/melanzane/product/create')
  async handle(@Body() createProductDTO: ProductDTO): Promise<ProductEntity> {
    return this.createProductService.execute({ createProductDTO });
  }
}
