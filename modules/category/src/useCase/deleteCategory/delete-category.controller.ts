import { uuidOptions } from 'modules/shared/src/pipes/uuid.config';

import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeleteCategoryService } from './delete-category.service';

@ApiTags('Categorias de Produtos')
@ApiBearerAuth()
@Controller()
export class DeleteCategoryController {
  constructor(private deleteCategoryService: DeleteCategoryService) {}
  @ApiOperation({
    summary: 'Deleta uma categoria de produto.',
  })
  @Delete('/api/category/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteCategoryService.execute(uuid);
  }
}
