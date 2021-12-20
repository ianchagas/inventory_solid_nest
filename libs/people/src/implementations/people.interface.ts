import { UpdateResult } from 'typeorm';

import { CreatePeopleDTO } from '../dto/request/create-people.dto';
import { QueryPeopleDTO } from '../dto/request/query-people.dto';
import { UpdatePeopleDTO } from '../dto/request/update-people.dto';
import { PeopleEntity } from '../infra/typeORM/entities/people.entity';

interface IPeopleRepository {
  create(data: CreatePeopleDTO): Promise<PeopleEntity>;

  update(data: UpdatePeopleDTO): Promise<UpdateResult>;

  findPeopleByIUUID(uuid: string): Promise<PeopleEntity>;

  delete(id: number): Promise<void>;

  findAll(): Promise<PeopleEntity[]>;

  findAllWithAddress(): Promise<PeopleEntity[]>;

  findPeopleByQuery(data: QueryPeopleDTO): Promise<PeopleEntity[]>;

  findPeopleByQueryWithAddress(data: QueryPeopleDTO): Promise<PeopleEntity[]>;

  findById(id: number): Promise<PeopleEntity>;
}

export { IPeopleRepository };
