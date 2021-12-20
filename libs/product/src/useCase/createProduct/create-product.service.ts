import { InventoryRepository } from 'libs/inventory/src/infra/typeORM/repositories/inventory.repository';

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
import { ProductDTO } from '@product/product/dto/request/product.dto';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductEntity } from '@product/product/infra/typeORM/entities/product.entity';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';
import { IUnitOfMeasurementRepository } from '@unit_of_measurement/unit-of-measurement/implementations/unit-of-measurement.interface';
import { UnitOfMeasurementRepository } from '@unit_of_measurement/unit-of-measurement/infra/typeORM/repositories/unit-of-measurement.repository';

interface IRequest {
  createProductDTO: ProductDTO;
}

@Injectable()
export class CreateProductService {
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

  async execute({ createProductDTO }: IRequest): Promise<ProductEntity> {
    const CreateProd = createProductDTO;
    const DepositId = await this.depositRepository.findById(
      CreateProd.id_deposit,
    );
    if (!DepositId) {
      throw new NotFoundException('Deposito não existe');
    }

    const UnitOfMeasurementId = await this.unRepository.findById(
      CreateProd.id_unit_of_measurement,
    );

    if (!UnitOfMeasurementId) {
      throw new NotFoundException('Unidade de Medida não existe');
    }

    if (CreateProd.id_category) {
      const CategoryId = await this.categoryRepository.findById(
        CreateProd.id_category,
      );
      if (!CategoryId) {
        throw new NotFoundException('Categoria não existe');
      }
    }

    if (CreateProd.id_people) {
      const PeopleId = await this.peopleRepository.findById(
        CreateProd.id_people,
      );
      if (!PeopleId) {
        throw new NotFoundException('Pessoa/Fornecedor não existe');
      }
    }

    const ValidateName = await this.productRepository.findByName(
      CreateProd.name,
    );
    if (ValidateName) {
      throw new BadRequestException(
        'Já existe um produto cadastrado com esse nome',
      );
    }

    const ValidateCode = await this.productRepository.findByCode(
      CreateProd.code,
    );
    if (ValidateCode) {
      throw new BadRequestException(
        'Já existe um produto cadastrado com esse código',
      );
    }

    const ValidateEan = await this.productRepository.findByEan(CreateProd.ean);
    if (ValidateEan) {
      throw new BadRequestException(
        'Já existe um produto cadastrado com esse EAN',
      );
    }

    const CreateNewProduct = await this.productRepository.create(CreateProd);

    return CreateNewProduct;
  }
}
