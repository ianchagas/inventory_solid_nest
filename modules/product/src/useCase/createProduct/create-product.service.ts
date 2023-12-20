import { InventoryRepository } from 'modules/inventory/src/infra/typeORM/repositories/inventory.repository';

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
import { ProductDTO } from 'modules/product/src/dto/request/product.dto';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductEntity } from 'modules/product/src/infra/typeORM/entities/product.entity';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import { IUnitOfMeasurementRepository } from 'modules/unit-of-measurement/src/implementations/unit-of-measurement.interface';
import { UnitOfMeasurementRepository } from 'modules/unit-of-measurement/src/infra/typeORM/repositories/unit-of-measurement.repository';

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
