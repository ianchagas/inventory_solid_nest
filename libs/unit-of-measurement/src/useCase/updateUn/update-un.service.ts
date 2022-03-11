/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

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
    const UnExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.unRepository,
      );

    updateUnDTO.uuid = UnExists.uuid;

    const UpdateUn = await this.unRepository.update(updateUnDTO);
    return UpdateUn.raw;
  }
}
