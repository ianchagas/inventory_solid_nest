import { Body, Controller, Post } from '@nestjs/common';

import { CategoryDTO } from '../../dto/request/category.dto';
import { CategoryEntity } from '../../infra/typeORM/entities/category.entity';
import { CreateCategoryService } from './create-category.service';

@Controller()
export class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}
  @Post('/api/melanzane/category/create')
  async handle(
    @Body() createCategoryDTO: CategoryDTO,
  ): Promise<CategoryEntity> {
    return this.createCategoryService.execute({ createCategoryDTO });
  }
}
