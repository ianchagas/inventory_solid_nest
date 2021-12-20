import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UpdateProductDTO } from '@product/product/dto/request/update-product.dto';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { UpdateProductService } from './update-product.service';

@Controller()
export class UpdateProductController {
  constructor(private updateProductService: UpdateProductService) {}
  @Put('/api/melanzane/product/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateProduct: UpdateProductDTO,
  ): Promise<UpdateResult> {
    return this.updateProductService.execute({ uuid, updateProduct });
  }
}
