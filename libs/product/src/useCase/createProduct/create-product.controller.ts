import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductDTO } from '@product/product/dto/request/product.dto';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';

import { CreateProductService } from './create-product.service';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller()
export class CreateProductController {
  constructor(private createProductService: CreateProductService) {}
  @ApiOperation({
    summary: 'Cadastra um novo produto.',
  })
  @Post('/api/melanzane/product/create')
  async handle(@Body() createProductDTO: ProductDTO): Promise<ProductEntity> {
    return this.createProductService.execute({ createProductDTO });
  }
}
