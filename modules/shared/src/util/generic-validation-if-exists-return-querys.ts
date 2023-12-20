import { CategoryEntity } from 'modules/category/src/infra/typeORM/entities/category.entity';
import { DepositEntity } from 'modules/deposit/src/infra/typeORM/entities/deposit.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PeopleEntity } from 'modules/people/src/infra/typeORM/entities/people.entity';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';
import { UnitOfMeasurementEntity } from 'modules/unit-of-measurement/src/infra/typeORM/entities/unit-of-measurement.entity';

export default class GenericValidationIfExistsReturnQuerys {
  static async FindPeopleExists(
    uuid: string,
    peopleRepository,
  ): Promise<PeopleEntity> {
    const PeopleExists = await peopleRepository.findPeopleByIUUID(uuid);
    if (!PeopleExists) {
      throw new NotFoundException('Entidade não encontrada');
    }

    return PeopleExists;
  }

  static async FindCategoryExists(
    uuid: string,
    categoryRepository,
  ): Promise<CategoryEntity> {
    const CategoryExists = await categoryRepository.findCategoryByUUID(uuid);

    if (!CategoryExists) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return CategoryExists;
  }

  static async FindDepositExists(
    uuid: string,
    depositRepository,
  ): Promise<DepositEntity> {
    const DepositExists = await depositRepository.findDepositByUUID(uuid);

    if (!DepositExists) {
      throw new NotFoundException('Deposito não encontrado');
    }

    return DepositExists;
  }

  static async FindUnOfMensure(
    uuid: string,
    unRepository,
  ): Promise<UnitOfMeasurementEntity> {
    const UnExists = await unRepository.findUnByUUID(uuid);

    if (!UnExists) {
      throw new NotFoundException('Unidade de medida não encontrada');
    }

    return UnExists;
  }

  static async FindProductExists(
    uuid: string,
    productRepository,
  ): Promise<ProductEntity> {
    const ProductExists = await productRepository.findByUUID(uuid);

    if (!ProductExists) {
      throw new NotFoundException('Produto não existe');
    }

    return ProductExists;
  }

  static async FindProductExistsAndIsEnable(
    ean: string,
    productRepository,
  ): Promise<ProductEntity> {
    const ProductExists = await productRepository.findByEan(ean);

    if (!ProductExists) {
      throw new NotFoundException('Produto não existe');
    }

    if (ProductExists.enable === false) {
      throw new BadRequestException(
        'Este produto encontra-se desativado, não é possível movimentar estoque.',
      );
    }

    return ProductExists;
  }
}
