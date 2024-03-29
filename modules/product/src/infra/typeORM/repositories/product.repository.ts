/* eslint-disable no-useless-return */
import { Repository, UpdateResult } from 'typeorm';

import { QueryInventoryDTO } from 'modules/inventory/src/dto/request/query-inventory.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'modules/product/src/dto/request/product.dto';
import { QueryProductDTO } from 'modules/product/src/dto/request/query-product.dto';
import { UpdateProductDTO } from 'modules/product/src/dto/request/update-product.dto';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';

import { ProductEntity } from '../entities/product.entity';

@Injectable()
class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProduct: ProductDTO): Promise<ProductEntity> {
    const CreateProduct = this.productRepository.create(createProduct);
    const SaveProduct = await this.productRepository.save(CreateProduct);

    return SaveProduct;
  }

  async findById(id: number): Promise<ProductEntity> {
    const FindById = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    return FindById;
  }

  async findByPeopleId(id_people: number): Promise<ProductEntity> {
    const FindByPeopleId = await this.productRepository.findOne({
      where: {
        id_people,
      },
    });

    return FindByPeopleId;
  }

  async findByCategoryId(id_category: number): Promise<ProductEntity> {
    const FindByCategoryId = await this.productRepository.findOne({
      where: {
        id_category,
      },
    });

    return FindByCategoryId;
  }

  async findByDepositId(id_deposit: number): Promise<ProductEntity> {
    const FindByDepositId = await this.productRepository.findOne({
      where: {
        id_deposit,
      },
    });

    return FindByDepositId;
  }

  async findByUnId(id_unit_of_measurement: number): Promise<ProductEntity> {
    const FindByUnId = await this.productRepository.findOne({
      where: {
        id_unit_of_measurement,
      },
    });

    return FindByUnId;
  }

  async findByUUID(uuid: string): Promise<ProductEntity> {
    const FindByUUID = await this.productRepository
      .createQueryBuilder('product')
      .where('product.uuid = :uuid', { uuid })
      .getOne();

    return FindByUUID;
  }

  async findByCode(code: string): Promise<ProductEntity> {
    const FindByCode = await this.productRepository
      .createQueryBuilder('product')
      .where('product.code like :code', { code })
      .getOne();

    return FindByCode;
  }

  async findByEan(ean: string): Promise<ProductEntity> {
    const FindByEan = await this.productRepository
      .createQueryBuilder('product')
      .where('product.ean like :ean', { ean })
      .getOne();

    return FindByEan;
  }

  async findByName(name: string): Promise<ProductEntity> {
    const FindByName = await this.productRepository
      .createQueryBuilder('product')
      .where('product.name like :name', { name })
      .getOne();
    return FindByName;
  }

  async update({
    uuid,
    name,
    code,
    ean,
    enable,
    id_deposit,
    id_unit_of_measurement,
    id_category,
    id_people,
  }: UpdateProductDTO): Promise<UpdateResult> {
    const UpdateProduct = this.productRepository.create({
      name,
      code,
      ean,
      enable,
      id_deposit,
      id_unit_of_measurement,
      id_category,
      id_people,
    });

    const Update = await this.productRepository
      .createQueryBuilder()
      .update(UpdateProduct)
      .where({ uuid })
      .returning([
        'uuid',
        'name',
        'code',
        'ean',
        'enable',
        'id_deposit',
        'id_unit_of_measurement',
        'id_category',
        'id_people',
      ])
      .execute();

    return Update;
  }

  async delete(id: number): Promise<void> {
    try {
      const DeleteProd = await this.productRepository.delete({ id });
      const { affected } = DeleteProd;

      if (affected === 0) {
        throw new NotFoundException(
          'Não é possível excluir. Produto não existe',
        );
      }
    } catch (Error) {
      throw new BadRequestException(
        'Não é possível excluir. Produto possui movimentações de estoque.',
      );
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    const FindAll = await this.productRepository.find({
      relations: ['unit_of_measurement', 'deposit', 'category', 'people'],
    });
    return FindAll;
  }

  async findAllWithInventory(): Promise<ProductEntity[]> {
    const FindAllWithInventory = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.inventory', 'inventory')
      .getMany();
    return FindAllWithInventory;
  }

  async findByQueryWithInventory({
    name,
    code,
    ean,
    enable,
    quantity,
    cost_price,
  }: QueryInventoryDTO): Promise<ProductEntity[]> {
    try {
      const FindByQueryWithInventory = this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.inventory', 'inventory');

      if (name) {
        FindByQueryWithInventory.where('product.name like :name', {
          name: `%${name}%`,
        });
      }

      if (code) {
        FindByQueryWithInventory.where('product.code like :code', {
          code: `%${code}%`,
        });
      }

      if (ean) {
        FindByQueryWithInventory.where('product.ean like :ean', {
          ean: `%${ean}%`,
        });
      }

      if (enable) {
        FindByQueryWithInventory.where('product.enable = :enable', {
          enable,
        });
      }

      const FilterProductWithInventory =
        await FindByQueryWithInventory.getMany();
      return FilterProductWithInventory;
    } catch (Error) {
      throw new BadRequestException('Parametro passado é inválido');
    }
  }

  async findByQuery({
    name,
    code,
    ean,
  }: QueryProductDTO): Promise<ProductEntity[]> {
    try {
      const FindWithQueryParams = this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.deposit', 'deposit')
        .leftJoinAndSelect('product.unit_of_measurement', 'un')
        .leftJoinAndSelect('product.people', 'people');

      if (name) {
        FindWithQueryParams.where('product.name like :name', {
          name: `%${name}%`,
        });
      }

      if (code) {
        FindWithQueryParams.where('product.code like :code', {
          code: `%${code}%`,
        });
      }

      if (ean) {
        FindWithQueryParams.where('product.ean like :ean', {
          ean: `%${ean}%`,
        });
      }

      const FilterProduct = await FindWithQueryParams.getMany();
      return FilterProduct;
    } catch (Error) {
      throw new BadRequestException('Parametro passado é inválido');
    }
  }
}

export { ProductRepository };
