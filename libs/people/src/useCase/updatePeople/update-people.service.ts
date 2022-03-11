/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { UpdatePeopleDTO } from '@people/people/dto/request/update-people.dto';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

interface IRequest {
  uuid: string;
  updatePeopleDTO: UpdatePeopleDTO;
}

@Injectable()
export class UpdatePeopleService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
  ) {}

  async execute({ uuid, updatePeopleDTO }: IRequest): Promise<UpdateResult> {
    const PeopleExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.peopleRepository,
      );

    updatePeopleDTO.uuid = PeopleExists.uuid;

    const UpdatePeople = await this.peopleRepository.update(updatePeopleDTO);
    return UpdatePeople.raw;
  }
}
