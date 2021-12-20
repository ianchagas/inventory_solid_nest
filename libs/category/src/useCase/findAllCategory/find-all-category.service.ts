/* eslint-disable no-param-reassign */
import { ICategoryRepository } from '@category/category/implementations/category.interface';
import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { CategoryRepository } from '@category/category/infra/typeORM/repositories/category.repository';
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
