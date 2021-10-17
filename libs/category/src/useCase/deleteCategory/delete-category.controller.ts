import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { DeleteCategoryService } from './delete-category.service';

@Controller()
export class DeleteCategoryController {
  constructor(private deleteCategoryService: DeleteCategoryService) {}
  @Delete('/api/melanzane/category/delete/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return this.deleteCategoryService.execute(uuid);
  }
}
