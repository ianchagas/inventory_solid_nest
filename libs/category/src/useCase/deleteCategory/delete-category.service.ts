/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ICategoryRepository } from '../../implementations/category.interface';
import { CategoryRepository } from '../../infra/typeORM/repositories/category.repository';

@Injectable()
export class DeleteCategoryService {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const CategoryExists = await this.categoryRepository.findCategoryByUUID(
      uuid,
    );

    if (!CategoryExists) {
      throw new NotFoundException('Unidade de Medida não encontrada');
    }

    const CategoryId = CategoryExists.id;

    return this.categoryRepository.delete(CategoryId);
  }
}
