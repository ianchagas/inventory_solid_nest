import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteProductService } from './delete-product.service';

@ApiTags('Produtos')
@ApiBearerAuth()
@Controller()
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductService) {}
  @ApiOperation({
    summary: 'Deleta um produto.',
  })
  @Delete('/api/melanzane/product/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteProductService.execute(uuid);
  }
}
