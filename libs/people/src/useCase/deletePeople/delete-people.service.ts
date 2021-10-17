/* eslint-disable no-param-reassign */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';

@Injectable()
export class DeletePeopleService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const PeopleExists = await this.peopleRepository.findPeopleByIUUID(uuid);
    if (!PeopleExists) {
      throw new NotFoundException('Entidade não encontrada');
    }
    const PeopleId = PeopleExists.id;
    return this.peopleRepository.delete(PeopleId);
  }
}
