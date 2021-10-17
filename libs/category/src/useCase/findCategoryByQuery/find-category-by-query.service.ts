/* eslint-disable no-param-reassign */
import { QueryCategoryDTO } from '@category/category/dto/request/query-category.dto';
import { ICategoryRepository } from '@category/category/implementations/category.interface';
import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { CategoryRepository } from '@category/category/infra/typeORM/repositories/category.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindCategoryByQueryService {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(queryCategoryDTO: QueryCategoryDTO): Promise<CategoryEntity[]> {
    return this.categoryRepository.findCategoryByQuery(queryCategoryDTO);
  }
}
