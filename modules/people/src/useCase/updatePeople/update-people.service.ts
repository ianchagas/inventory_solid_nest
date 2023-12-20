/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { UpdatePeopleDTO } from 'modules/people/src/dto/request/update-people.dto';
import { IPeopleRepository } from 'modules/people/src/implementations/people.interface';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

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
