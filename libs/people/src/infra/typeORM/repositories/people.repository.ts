/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import { Repository, UpdateResult } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePeopleDTO } from '@people/people/dto/request/create-people.dto';
import { QueryPeopleDTO } from '@people/people/dto/request/query-people.dto';
import { UpdatePeopleDTO } from '@people/people/dto/request/update-people.dto';
import { IPeopleRepository } from '@people/people/implementations/people.interface';

import { PeopleEntity } from '../entities/people.entity';

@Injectable()
class PeopleRepository implements IPeopleRepository {
  constructor(
    @InjectRepository(PeopleEntity)
    private peopleRepository: Repository<PeopleEntity>,
  ) {}

  async create(createPeopleDTO: CreatePeopleDTO): Promise<PeopleEntity> {
    const CreatePeople = this.peopleRepository.create(createPeopleDTO);
    const CreatedPeople = await this.peopleRepository.save(CreatePeople);

    return CreatedPeople;
  }

  async findPeopleByIUUID(uuid: string): Promise<PeopleEntity> {
    try {
      const FindPeopleById = await this.peopleRepository.findOne({
        where: {
          uuid,
        },
      });

      return FindPeopleById;
    } catch (Error) {
      throw new NotFoundException('Entidade não encontrada');
    }
  }

  async update({
    uuid,
    name,
    email,
    cpf,
    cnpj,
    ie,
    corporate_name,
    fantasy_name,
    comments,
  }: UpdatePeopleDTO): Promise<UpdateResult> {
    const UpdatePeople = this.peopleRepository.create({
      name,
      email,
      cpf,
      cnpj,
      ie,
      corporate_name,
      fantasy_name,
      comments,
    });

    const Update = await this.peopleRepository
      .createQueryBuilder()
      .update(UpdatePeople)
      .where({ uuid })
      .returning([
        'uuid',
        'name',
        'email',
        'cpf',
        'cnpj',
        'ie',
        'corporate_name',
        'fantasy_name',
        'comments',
      ])
      .execute();

    return Update;
  }

  async delete(id: number): Promise<void> {
    try {
      const DeletePeople = await this.peopleRepository.delete({ id });
      const { affected } = DeletePeople;

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

  async findAll(): Promise<PeopleEntity[]> {
    return this.peopleRepository.find();
  }

  async findAllWithAddress(): Promise<PeopleEntity[]> {
    return this.peopleRepository.find({
      relations: ['address'],
    });
  }

  async findPeopleByQueryWithAddress({
    id,
    uuid,
    name,
    email,
    cpf,
    cnpj,
    ie,
    corporate_name,
    fantasy_name,
    comments,
  }: QueryPeopleDTO): Promise<PeopleEntity[]> {
    try {
      const FindWithQueryParams = this.peopleRepository
        .createQueryBuilder('people')
        .leftJoinAndSelect('people.address', 'address');
      if (id) {
        FindWithQueryParams.where('people.id = :id', { id });
      }

      if (uuid) {
        FindWithQueryParams.where('people.uuid = :uuid', { uuid });
      }

      if (name) {
        FindWithQueryParams.where('people.name like :name', {
          name: `%${name}%`,
        });
      }

      if (email) {
        FindWithQueryParams.where('people.email like :email', {
          email: `%${email}%`,
        });
      }

      if (cpf) {
        FindWithQueryParams.where('people.cpf = :cpf', { cpf });
      }

      if (cnpj) {
        FindWithQueryParams.where('people.cnpj = :cnpj', { cnpj });
      }

      if (ie) {
        FindWithQueryParams.where('people.ie = :ie', { ie });
      }

      if (corporate_name) {
        FindWithQueryParams.where(
          'people.corporate_name like :corporate_name',
          {
            corporate_name: `%${corporate_name}%`,
          },
        );
      }

      if (fantasy_name) {
        FindWithQueryParams.where('people.fantasy_name like :fantasy_name', {
          fantasy_name: `%${fantasy_name}%`,
        });
      }

      if (comments) {
        FindWithQueryParams.where('people.comments = :comments', { comments });
      }

      const FilterPeoples = await FindWithQueryParams.getMany();
      return FilterPeoples;
    } catch (Error) {
      throw new BadRequestException('Parametro passado é inválido');
    }
  }

  async findPeopleByQuery({
    id,
    uuid,
    name,
    email,
    cpf,
    cnpj,
    ie,
    corporate_name,
    fantasy_name,
    comments,
  }: QueryPeopleDTO): Promise<PeopleEntity[]> {
    try {
      const FindWithQueryParams =
        this.peopleRepository.createQueryBuilder('people');
      if (id) {
        FindWithQueryParams.where('people.id = :id', { id });
      }

      if (uuid) {
        FindWithQueryParams.where('people.uuid = :uuid', { uuid });
      }

      if (name) {
        FindWithQueryParams.where('people.name like :name', {
          name: `%${name}%`,
        });
      }

      if (email) {
        FindWithQueryParams.where('people.email like :email', {
          email: `%${email}%`,
        });
      }

      if (cpf) {
        FindWithQueryParams.where('people.cpf = :cpf', { cpf });
      }

      if (cnpj) {
        FindWithQueryParams.where('people.cnpj = :cnpj', { cnpj });
      }

      if (ie) {
        FindWithQueryParams.where('people.ie = :ie', { ie });
      }

      if (corporate_name) {
        FindWithQueryParams.where(
          'people.corporate_name like :corporate_name',
          {
            corporate_name: `%${corporate_name}%`,
          },
        );
      }

      if (fantasy_name) {
        FindWithQueryParams.where('people.fantasy_name like :fantasy_name', {
          fantasy_name: `%${fantasy_name}%`,
        });
      }

      if (comments) {
        FindWithQueryParams.where('people.comments = :comments', { comments });
      }

      const FilterPeoples = await FindWithQueryParams.getMany();
      return FilterPeoples;
    } catch (Error) {
      throw new BadRequestException('Parametro passado é inválido');
    }
  }

  async findById(id: number): Promise<PeopleEntity> {
    const FindPeopleById = this.peopleRepository.findOne(id);
    return FindPeopleById;
  }
}

export { PeopleRepository };
