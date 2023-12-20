import { Inject, Injectable } from '@nestjs/common';

import { UnitOfMeasurementDTO } from '../../dto/request/unit-of-measurement.dto';
import { IUnitOfMeasurementRepository } from '../../implementations/unit-of-measurement.interface';
import { UnitOfMeasurementEntity } from '../../infra/typeORM/entities/unit-of-measurement.entity';
import { UnitOfMeasurementRepository } from '../../infra/typeORM/repositories/unit-of-measurement.repository';

interface IRequest {
  createUnitOfMeasurementDTO: UnitOfMeasurementDTO;
}

@Injectable()
export class CreateUnService {
  constructor(
    @Inject(UnitOfMeasurementRepository)
    private unRepository: IUnitOfMeasurementRepository,
  ) {}

  async execute({
    createUnitOfMeasurementDTO,
  }: IRequest): Promise<UnitOfMeasurementEntity> {
    const CreateUN = createUnitOfMeasurementDTO;

    return this.unRepository.create(CreateUN);
  }
}
