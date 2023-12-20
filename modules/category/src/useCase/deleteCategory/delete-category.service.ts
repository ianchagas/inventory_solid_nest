/* eslint-disable no-param-reassign */
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ICategoryRepository } from '../../implementations/category.interface';
import { CategoryRepository } from '../../infra/typeORM/repositories/category.repository';

@Injectable()
export class DeleteCategoryService {
  constructor(
    @Inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const CategoryExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.categoryRepository,
      );

    const CategoryId = CategoryExists.id;

    const FindConflictInCategoryAndProduct =
      await this.productRepository.findByCategoryId(CategoryId);

    if (FindConflictInCategoryAndProduct) {
      throw new ConflictException(
        'Não é possível excluir. Categoria associada a um ou mais produtos',
      );
    }

    return this.categoryRepository.delete(CategoryId);
  }
}
