/* eslint-disable no-param-reassign */
import { Inject, Injectable } from '@nestjs/common';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';

@Injectable()
export class FindAllPeopleWithAddressService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
  ) {}

  async execute(): Promise<PeopleEntity[]> {
    return this.peopleRepository.findAllWithAddress();
  }
}
