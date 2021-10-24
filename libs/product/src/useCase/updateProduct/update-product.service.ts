/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { ICategoryRepository } from '@category/category/implementations/category.interface';
import { CategoryRepository } from '@category/category/infra/typeORM/repositories/category.repository';
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';
import { UpdateProductDTO } from '@product/product/dto/request/update-product.dto';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';
import { IUnitOfMeasurementRepository } from '@unit_of_measurement/unit-of-measurement/implementations/unit-of-measurement.interface';
import { UnitOfMeasurementRepository } from '@unit_of_measurement/unit-of-measurement/infra/typeORM/repositories/unit-of-measurement.repository';

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
    const FindProductByUUID = await this.productRepository.findByUUID(uuid);

    if (!FindProductByUUID) {
      throw new NotFoundException('Produto não encontrado');
    }

    updateProduct.uuid = FindProductByUUID.uuid;

    if (updateProduct.id_deposit) {
      const DepositId = await this.depositRepository.findById(
        updateProduct.id_deposit,
      );

      if (!DepositId) {
        throw new NotFoundException('Deposito não existe');
      }
    }

    if (updateProduct.id_unit_of_measurement) {
      const UnitOfMeasurementId = await this.unRepository.findById(
        updateProduct.id_unit_of_measurement,
      );

      if (!UnitOfMeasurementId) {
        throw new NotFoundException('Unidade de Medida não existe');
      }
    }

    if (updateProduct.id_category) {
      const CategoryId = await this.categoryRepository.findById(
        updateProduct.id_category,
      );

      if (!CategoryId) {
        throw new NotFoundException('Categoria não existe');
      }
    }

    if (updateProduct.id_people) {
      const PeopleId = await this.peopleRepository.findById(
        updateProduct.id_people,
      );
      if (!PeopleId) {
        throw new NotFoundException('Pessoa/Fornecedor não existe');
      }
    }

    if (updateProduct.name) {
      const ValidateName = await this.productRepository.findByName(
        updateProduct.name,
      );
      if (ValidateName) {
        throw new BadRequestException(
          'Já existe um produto cadastrado com esse nome',
        );
      }
    }

    if (updateProduct.code) {
      const ValidateCode = await this.productRepository.findByCode(
        updateProduct.code,
      );
      if (ValidateCode) {
        throw new BadRequestException(
          'Já existe um produto cadastrado com esse código',
        );
      }
    }

    if (updateProduct.ean) {
      const ValidateEan = await this.productRepository.findByEan(
        updateProduct.ean,
      );
      if (ValidateEan) {
        throw new BadRequestException(
          'Já existe um produto cadastrado com esse EAN',
        );
      }
    }

    return this.productRepository.update(updateProduct);
  }
}
