import { Inject, Injectable } from '@nestjs/common';

import { CategoryDTO } from '../../dto/request/category.dto';
import { ICategoryRepository } from '../../implementations/category.interface';
import { CategoryEntity } from '../../infra/typeORM/entities/category.entity';
import { CategoryRepository } from '../../infra/typeORM/repositories/category.repository';

interface IRequest {
  createCategoryDTO: CategoryDTO;
}

@Injectable()
export class CreateCategoryService {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ createCategoryDTO }: IRequest): Promise<CategoryEntity> {
    const CreateCategory = createCategoryDTO;

    return this.categoryRepository.create(CreateCategory);
  }
}
