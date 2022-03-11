/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

import { CategoryDTO } from '../../dto/request/category.dto';
import { ICategoryRepository } from '../../implementations/category.interface';
import { CategoryRepository } from '../../infra/typeORM/repositories/category.repository';

interface IRequest {
  uuid: string;
  updateCategoryDTO: CategoryDTO;
}

@Injectable()
export class UpdateCategoryService {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ uuid, updateCategoryDTO }: IRequest): Promise<UpdateResult> {
    const CategoryExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.categoryRepository,
      );

    updateCategoryDTO.uuid = CategoryExists.uuid;
    const UpdateCategory = await this.categoryRepository.update(
      updateCategoryDTO,
    );
    return UpdateCategory.raw;
  }
}
