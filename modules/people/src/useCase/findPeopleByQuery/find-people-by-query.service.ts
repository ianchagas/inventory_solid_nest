/* eslint-disable no-param-reassign */
import { Inject, Injectable } from '@nestjs/common';
import { QueryPeopleDTO } from 'modules/people/src/dto/request/query-people.dto';
import { IPeopleRepository } from 'modules/people/src/implementations/people.interface';
import { PeopleEntity } from 'modules/people/src/infra/typeORM/entities/people.entity';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';

@Injectable()
export class FindPeopleByQueryService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
  ) {}

  async execute(queryPeopleDTO: QueryPeopleDTO): Promise<PeopleEntity[]> {
    return this.peopleRepository.findPeopleByQuery(queryPeopleDTO);
  }
}
