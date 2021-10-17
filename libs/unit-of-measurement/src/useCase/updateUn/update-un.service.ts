/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';

import { UnitOfMeasurementDTO } from '../../dto/request/unit-of-measurement.dto';
import { IUnitOfMeasurementRepository } from '../../implementations/unit-of-measurement.interface';
import { UnitOfMeasurementRepository } from '../../infra/typeORM/repositories/unit-of-measurement.repository';

interface IRequest {
  uuid: string;
  updateUnDTO: UnitOfMeasurementDTO;
}

@Injectable()
export class UpdateUnService {
  constructor(
    @Inject(UnitOfMeasurementRepository)
    private unRepository: IUnitOfMeasurementRepository,
  ) {}

  async execute({ uuid, updateUnDTO }: IRequest): Promise<UpdateResult> {
    const UnExists = await this.unRepository.findUnByUUID(uuid);

    if (!UnExists) {
      throw new NotFoundException('Unidade de Medida não encontrada');
    }

    updateUnDTO.uuid = UnExists.uuid;

    return this.unRepository.update(updateUnDTO);
  }
}
