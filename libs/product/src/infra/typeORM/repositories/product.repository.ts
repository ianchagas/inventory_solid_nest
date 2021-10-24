/* eslint-disable no-useless-return */
import { Repository, UpdateResult } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from '@product/product/dto/request/product.dto';
import { UpdateProductDTO } from '@product/product/dto/request/update-product.dto';
import { IProductRepository } from '@product/product/implementations/product.interface';

import { ProductEntity } from '../entities/product.entity';

@Injectable()
class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProduct: ProductDTO): Promise<ProductEntity> {
    const SaveProduct = await this.productRepository.save(createProduct);

    return SaveProduct;
  }

  async findById(id: number): Promise<ProductEntity> {
    const FindById = await this.productRepository.findOne(id);

    return FindById;
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

  async findByEan(ean: number): Promise<ProductEntity> {
    const FindByEan = await this.productRepository.findOne(ean);

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
    id_deposit,
    id_unit_of_measurement,
    id_category,
    id_people,
  }: UpdateProductDTO): Promise<UpdateResult> {
    const UpdateProduct = this.productRepository.create({
      name,
      code,
      ean,
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
      throw new NotFoundException('Não é possível excluir. Produto não existe');
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
}

export { ProductRepository };
