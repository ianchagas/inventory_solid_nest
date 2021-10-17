/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import { CategoryDTO } from 'libs/category/src/dto/request/category.dto';
import { ICategoryRepository } from 'libs/category/src/implementations/category.interface';
import { Repository, UpdateResult } from 'typeorm';

import { QueryCategoryDTO } from '@category/category/dto/request/query-category.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from '../entities/category.entity';

@Injectable()
class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDTO: CategoryDTO): Promise<CategoryEntity> {
    const CreateCategory = this.categoryRepository.create(createCategoryDTO);
    const CreatedCategory = await this.categoryRepository.save(CreateCategory);

    return CreatedCategory;
  }

  async findCategoryByUUID(uuid: string): Promise<CategoryEntity> {
    try {
      const FindCategoryById = await this.categoryRepository.findOne({
        where: {
          uuid,
        },
      });

      return FindCategoryById;
    } catch (Error) {
      throw new NotFoundException('Categoria não encontrada');
    }
  }

  async update({ uuid, name }: CategoryDTO): Promise<UpdateResult> {
    const UpdateCategory = this.categoryRepository.create({
      name,
    });

    const Update = await this.categoryRepository
      .createQueryBuilder()
      .update(UpdateCategory)
      .where({ uuid })
      .returning(['uuid', 'name'])
      .execute();

    return Update;
  }

  async delete(id: number): Promise<void> {
    try {
      const DeleteCategory = await this.categoryRepository.delete({ id });
      const { affected } = DeleteCategory;

      if (affected === 0) {
        throw new NotFoundException(
          'Não é possível excluir. Entidade não existe.',
        );
      }
    } catch (Error) {
      throw new NotFoundException(
        'Não é possível excluir. Entidade não existe.',
      );
    }
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async findCategoryByQuery({
    id,
    uuid,
    name,
  }: QueryCategoryDTO): Promise<CategoryEntity[]> {
    try {
      const FindWithQueryParams =
        this.categoryRepository.createQueryBuilder('category');
      if (id) {
        FindWithQueryParams.where('category.id = :id', { id });
      }

      if (uuid) {
        FindWithQueryParams.where('category.uuid = :uuid', { uuid });
      }

      if (name) {
        FindWithQueryParams.where('category.name like :name', {
          name: `%${name}%`,
        });
      }

      const FiltersCategory = await FindWithQueryParams.getMany();
      return FiltersCategory;
    } catch (Error) {
      throw new BadRequestException('Parametro passado é inválido');
    }
  }
}

export { CategoryRepository };
