/* eslint-disable no-param-reassign */
import { Inject, Injectable } from '@nestjs/common';

import { IUnitOfMeasurementRepository } from '../../implementations/unit-of-measurement.interface';
import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { UnitOfMeasurementRepository } from '../../infra/typeORM/repositories/unit-of-measurement.repository';

@Injectable()
export class FindAllUnService {
  constructor(
    @Inject(UnitOfMeasurementRepository)
    private unRepository: IUnitOfMeasurementRepository,
  ) {}

  async execute(): Promise<UnitOfMeasurementEntity[]> {
    return this.unRepository.findAll();
  }
}
