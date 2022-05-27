import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FindCategoryByQueryService } from './find-category-by-query.service';

@ApiTags('Categorias de Produtos')
@ApiBearerAuth()
@Controller()
export class FindCategoryByQueryController {
  constructor(private findCategoryByQueryService: FindCategoryByQueryService) {}
  @ApiOperation({
    summary: 'Busca categorias de produto através de parâmetros.',
  })
  @Get('/api/category/find')
  async handle(
    @Query('id') id: number,
    @Query('uuid') uuid: string,
    @Query('name') name: string,
  ): Promise<CategoryEntity[]> {
    return this.findCategoryByQueryService.execute({
      id,
      uuid,
      name,
    });
  }
}
