import { UpdateResult } from 'typeorm';

import { DepositDTO } from '../dto/request/deposit.dto';
import { QueryDepositDTO } from '../dto/request/query-deposit.dto';
import { DepositEntity } from '../infra/typeORM/entities/deposit.entity';

interface IDepositRepository {
  create(data: DepositDTO): Promise<DepositEntity>;
  findDepositByUUID(uuid: string): Promise<DepositEntity>;
  update(data: DepositDTO): Promise<UpdateResult>;
  delete(id: number): Promise<void>;
  findAll(): Promise<DepositEntity[]>;
  findDepositByQuery(data: QueryDepositDTO): Promise<DepositEntity[]>;
}

export { IDepositRepository };
