import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FindAllCategoryService } from './find-all-category.service';

@ApiTags('Categorias de Produtos')
@ApiBearerAuth()
@Controller()
export class FindAllCategoryController {
  constructor(private findAllCategoryService: FindAllCategoryService) {}
  @ApiOperation({
    summary: 'Busca todas as categorias de produto.',
  })
  @Get('/api/category/find-all')
  async handle(): Promise<CategoryEntity[]> {
    return this.findAllCategoryService.execute();
  }
}
