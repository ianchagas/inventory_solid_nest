import { UpdateResult } from 'typeorm';

import { ProductDTO } from '../dto/request/product.dto';
import { QueryProductDTO } from '../dto/request/query-product.dto';
import { UpdateProductDTO } from '../dto/request/update-product.dto';
import { ProductEntity } from '../infra/typeORM/entities/product.entity';

interface IProductRepository {
  create(data: ProductDTO): Promise<ProductEntity>;

  findById(id: number): Promise<ProductEntity>;

  findByUUID(uuid: string): Promise<ProductEntity>;

  findByCode(code: string): Promise<ProductEntity>;

  findByEan(ean: number): Promise<ProductEntity>;

  findByName(name: string): Promise<ProductEntity>;

  update(data: UpdateProductDTO): Promise<UpdateResult>;

  delete(id: number): Promise<void>;

  findAll(): Promise<ProductEntity[]>;

  findByQuery(data: QueryProductDTO): Promise<ProductEntity[]>;
}

export { IProductRepository };
