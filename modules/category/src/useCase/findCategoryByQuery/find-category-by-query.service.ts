/* eslint-disable no-param-reassign */
import { QueryCategoryDTO } from 'modules/category/src/dto/request/query-category.dto';
import { ICategoryRepository } from 'modules/category/src/implementations/category.interface';
import { CategoryEntity } from 'modules/category/src/infra/typeORM/entities/category.entity';
import { CategoryRepository } from 'modules/category/src/infra/typeORM/repositories/category.repository';

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
