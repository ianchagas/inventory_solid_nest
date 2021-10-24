import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteProductService } from './delete-product.service';

@Controller()
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductService) {}
  @Delete('/api/melanzane/product/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteProductService.execute(uuid);
  }
}
