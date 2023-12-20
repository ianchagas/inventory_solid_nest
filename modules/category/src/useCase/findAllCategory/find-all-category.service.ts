/* eslint-disable no-param-reassign */
import { ICategoryRepository } from 'modules/category/src/implementations/category.interface';
import { CategoryEntity } from 'modules/category/src/infra/typeORM/entities/category.entity';
import { CategoryRepository } from 'modules/category/src/infra/typeORM/repositories/category.repository';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllCategoryService {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findAll();
  }
}
