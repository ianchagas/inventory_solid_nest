import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { Controller, Get, Query } from '@nestjs/common';

import { FindCategoryByQueryService } from './find-category-by-query.service';

@Controller()
export class FindCategoryByQueryController {
  constructor(private findCategoryByQueryService: FindCategoryByQueryService) {}
  @Get('/api/melanzane/category/find')
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
