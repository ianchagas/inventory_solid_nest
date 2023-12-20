import { UpdateResult } from 'typeorm';

import { QueryInventoryDTO } from 'modules/inventory/src/dto/request/query-inventory.dto';

import { ProductDTO } from '../dto/request/product.dto';
import { QueryProductDTO } from '../dto/request/query-product.dto';
import { UpdateProductDTO } from '../dto/request/update-product.dto';
import { ProductEntity } from '../infra/typeORM/entities/product.entity';

interface IProductRepository {
  create(data: ProductDTO): Promise<ProductEntity>;

  findById(id: number): Promise<ProductEntity>;

  findByUUID(uuid: string): Promise<ProductEntity>;

  findByCategoryId(id_category: number): Promise<ProductEntity>;

  findByPeopleId(id_people: number): Promise<ProductEntity>;

  findByDepositId(id_deposit: number): Promise<ProductEntity>;

  findByUnId(id_unit_of_measurement: number): Promise<ProductEntity>;

  findByCode(code: string): Promise<ProductEntity>;

  findByEan(ean: string): Promise<ProductEntity>;

  findByName(name: string): Promise<ProductEntity>;

  update(data: UpdateProductDTO): Promise<UpdateResult>;

  delete(id: number): Promise<void>;

  findAll(): Promise<ProductEntity[]>;

  findByQuery(data: QueryProductDTO): Promise<ProductEntity[]>;

  findAllWithInventory(): Promise<ProductEntity[]>;

  findByQueryWithInventory(data: QueryInventoryDTO): Promise<ProductEntity[]>;
}

export { IProductRepository };
