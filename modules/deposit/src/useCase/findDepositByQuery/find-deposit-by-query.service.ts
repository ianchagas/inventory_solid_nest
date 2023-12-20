/* eslint-disable no-param-reassign */
import { QueryDepositDTO } from 'modules/deposit/src/dto/request/query-deposit.dto';
import { IDepositRepository } from 'modules/deposit/src/implementations/deposit.interface';
import { DepositEntity } from 'modules/deposit/src/infra/typeORM/entities/deposit.entity';
import { DepositRepository } from 'modules/deposit/src/infra/typeORM/repositories/deposit.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindDepositByQueryService {
  constructor(
    @Inject(DepositRepository)
    private depositRepository: IDepositRepository,
  ) {}

  async execute(queryDepositDTO: QueryDepositDTO): Promise<DepositEntity[]> {
    return this.depositRepository.findDepositByQuery(queryDepositDTO);
  }
}
