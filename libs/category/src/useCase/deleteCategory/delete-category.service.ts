/* eslint-disable no-param-reassign */
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

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
