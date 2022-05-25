import { UpdateResult } from 'typeorm';

import { CategoryDTO } from '../dto/request/category.dto';
import { QueryCategoryDTO } from '../dto/request/query-category.dto';
import { CategoryEntity } from '../infra/typeORM/entities/category.entity';

interface ICategoryRepository {
  create(data: CategoryDTO): Promise<CategoryEntity>;
  findCategoryByUUID(uuid: string): Promise<CategoryEntity>;
  update(data: CategoryDTO): Promise<UpdateResult>;
  delete(id: number): Promise<void>;
  findAll(): Promise<CategoryEntity[]>;
  findCategoryByQuery(data: QueryCategoryDTO): Promise<CategoryEntity[]>;
  findById(id: number): Promise<CategoryEntity>;
  findByName(name: string): Promise<CategoryEntity>;
}

export { ICategoryRepository };
