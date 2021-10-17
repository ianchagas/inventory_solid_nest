import { UpdateResult } from 'typeorm';

import { QueryUnDTO } from '../dto/request/query-un.dto';
import { UnitOfMeasurementDTO } from '../dto/request/unit-of-measurement.dto';
import { UnitOfMeasurementEntity } from '../infra/typeORM/entities/unit-of-measurement.entity';

interface IUnitOfMeasurementRepository {
  create(data: UnitOfMeasurementDTO): Promise<UnitOfMeasurementEntity>;

  findUnByUUID(uuid: string): Promise<UnitOfMeasurementEntity>;

  update(data: UnitOfMeasurementDTO): Promise<UpdateResult>;

  delete(id: number): Promise<void>;

  findAll(): Promise<UnitOfMeasurementEntity[]>;

  findUnByQuery(data: QueryUnDTO): Promise<UnitOfMeasurementEntity[]>;
}

export { IUnitOfMeasurementRepository };
