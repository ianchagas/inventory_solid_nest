/* eslint-disable no-param-reassign */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IUnitOfMeasurementRepository } from '../../implementations/unit-of-measurement.interface';
import { UnitOfMeasurementRepository } from '../../infra/typeORM/repositories/unit-of-measurement.repository';

@Injectable()
export class DeleteUnService {
  constructor(
    @Inject(UnitOfMeasurementRepository)
    private unRepository: IUnitOfMeasurementRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const UnExists = await this.unRepository.findUnByUUID(uuid);
    if (!UnExists) {
      throw new NotFoundException('Entidade não encontrada');
    }
    const UnId = UnExists.id;
    return this.unRepository.delete(UnId);
  }
}
