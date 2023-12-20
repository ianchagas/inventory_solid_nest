import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductDTO } from 'modules/product/src/dto/request/product.dto';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';

import { CreateProductService } from './create-product.service';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller()
export class CreateProductController {
  constructor(private createProductService: CreateProductService) {}
  @ApiOperation({
    summary: 'Cadastra um novo produto.',
  })
  @Post('/api/product/create')
  async handle(@Body() createProductDTO: ProductDTO): Promise<ProductEntity> {
    return this.createProductService.execute({ createProductDTO });
  }
}
