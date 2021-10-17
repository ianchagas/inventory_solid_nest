import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { Controller, Get } from '@nestjs/common';

import { FindAllCategoryService } from './find-all-category.service';

@Controller()
export class FindAllCategoryController {
  constructor(private findAllCategoryService: FindAllCategoryService) {}
  @Get('/api/melanzane/category/find-all')
  async handle(): Promise<CategoryEntity[]> {
    return this.findAllCategoryService.execute();
  }
}
