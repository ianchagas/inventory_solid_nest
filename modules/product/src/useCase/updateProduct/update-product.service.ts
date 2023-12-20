/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { ICategoryRepository } from 'modules/category/src/implementations/category.interface';
import { CategoryRepository } from 'modules/category/src/infra/typeORM/repositories/category.repository';
import { IDepositRepository } from 'modules/deposit/src/implementations/deposit.interface';
import { DepositRepository } from 'modules/deposit/src/infra/typeORM/repositories/deposit.repository';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IPeopleRepository } from 'modules/people/src/implementations/people.interface';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import { UpdateProductDTO } from 'modules/product/src/dto/request/update-product.dto';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';
import { IUnitOfMeasurementRepository } from 'modules/unit-of-measurement/src/implementations/unit-of-measurement.interface';
import { UnitOfMeasurementRepository } from 'modules/unit-of-measurement/src/infra/typeORM/repositories/unit-of-measurement.repository';

interface IRequest {
  uuid: string;
  updateProduct: UpdateProductDTO;
}

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
    @Inject(DepositRepository)
    private depositRepository: IDepositRepository,
    @Inject(UnitOfMeasurementRepository)
    private unRepository: IUnitOfMeasurementRepository,
    @Inject(CategoryRepository)
    private categoryRepository: ICategoryRepository,
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
  ) {}

  async execute({ uuid, updateProduct }: IRequest): Promise<UpdateResult> {
    const ProductExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.productRepository,
      );

    const UpdateProduct = updateProduct;

    UpdateProduct.uuid = ProductExists.uuid;

    if (UpdateProduct.id_deposit) {
      const DepositId = await this.depositRepository.findById(
        UpdateProduct.id_deposit,
      );

      if (!DepositId) {
        throw new NotFoundException('Deposito não existe');
      }
    }

    if (UpdateProduct.id_unit_of_measurement) {
      const UnitOfMeasurementId = await this.unRepository.findById(
        UpdateProduct.id_unit_of_measurement,
      );

      if (!UnitOfMeasurementId) {
        throw new NotFoundException('Unidade de Medida não existe');
      }
    }

    if (UpdateProduct.id_category) {
      const CategoryId = await this.categoryRepository.findById(
        UpdateProduct.id_category,
      );

      if (!CategoryId) {
        throw new NotFoundException('Categoria não existe');
      }
    }

    if (UpdateProduct.id_people) {
      const PeopleId = await this.peopleRepository.findById(
        UpdateProduct.id_people,
      );
      if (!PeopleId) {
        throw new NotFoundException('Pessoa/Fornecedor não existe');
      }
    }

    if (UpdateProduct.name) {
      const ValidateName = await this.productRepository.findByName(
        UpdateProduct.name,
      );
      if (ValidateName) {
        throw new BadRequestException(
          'Já existe um produto cadastrado com esse nome',
        );
      }
    }

    if (UpdateProduct.code) {
      const ValidateCode = await this.productRepository.findByCode(
        UpdateProduct.code,
      );
      if (ValidateCode) {
        throw new BadRequestException(
          'Já existe um produto cadastrado com esse código',
        );
      }
    }

    if (UpdateProduct.ean) {
      const ValidateEan = await this.productRepository.findByEan(
        UpdateProduct.ean,
      );
      if (ValidateEan) {
        throw new BadRequestException(
          'Já existe um produto cadastrado com esse EAN',
        );
      }
    }

    const UpdatedProduct = await this.productRepository.update(UpdateProduct);
    return UpdatedProduct.raw;
  }
}
