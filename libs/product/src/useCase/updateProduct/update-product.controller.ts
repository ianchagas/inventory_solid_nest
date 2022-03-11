import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProductDTO } from '@product/product/dto/request/update-product.dto';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { UpdateProductService } from './update-product.service';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller()
export class UpdateProductController {
  constructor(private updateProductService: UpdateProductService) {}
  @ApiOperation({
    summary: 'Altera as informações de um produto.',
  })
  @Put('/api/melanzane/product/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateProduct: UpdateProductDTO,
  ): Promise<UpdateResult> {
    return this.updateProductService.execute({ uuid, updateProduct });
  }
}
