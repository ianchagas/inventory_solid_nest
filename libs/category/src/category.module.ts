import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from './infra/typeORM/entities/category.entity';
import { CategoryRepository } from './infra/typeORM/repositories/category.repository';
import { CreateCategoryController } from './useCase/createCategory/create-category.controller';
import { CreateCategoryService } from './useCase/createCategory/create-category.service';
import { DeleteCategoryController } from './useCase/deleteCategory/delete-category.controller';
import { DeleteCategoryService } from './useCase/deleteCategory/delete-category.service';
import { FindAllCategoryController } from './useCase/findAllCategory/find-all-category.controller';
import { FindAllCategoryService } from './useCase/findAllCategory/find-all-category.service';
import { FindCategoryByQueryController } from './useCase/findCategoryByQuery/find-category-by-query.controller';
import { FindCategoryByQueryService } from './useCase/findCategoryByQuery/find-category-by-query.service';
import { UpdateCategoryController } from './useCase/updateCategory/update-category.controller';
import { UpdateCategoryService } from './useCase/updateCategory/update-category.service';

@Module({
  controllers: [
    CreateCategoryController,
    UpdateCategoryController,
    DeleteCategoryController,
    FindAllCategoryController,
    FindCategoryByQueryController,
  ],
  exports: [],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    CreateCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
    FindAllCategoryService,
    FindCategoryByQueryService,
    CategoryRepository,
  ],
})
export class CategoryModule {}
