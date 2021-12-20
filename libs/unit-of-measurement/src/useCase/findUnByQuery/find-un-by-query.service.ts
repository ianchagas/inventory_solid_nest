/* eslint-disable no-param-reassign */
import { Inject, Injectable } from '@nestjs/common';

import { QueryUnDTO } from '../../dto/request/query-un.dto';
import { IUnitOfMeasurementRepository } from '../../implementations/unit-of-measurement.interface';
import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { UnitOfMeasurementRepository } from '../../infra/typeORM/repositories/unit-of-measurement.repository';

@Injectable()
export class FindUnByQueryService {
  constructor(
    @Inject(UnitOfMeasurementRepository)
    private unRepository: IUnitOfMeasurementRepository,
  ) {}

  async execute(queryUnDTO: QueryUnDTO): Promise<UnitOfMeasurementEntity[]> {
    return this.unRepository.findUnByQuery(queryUnDTO);
  }
}
