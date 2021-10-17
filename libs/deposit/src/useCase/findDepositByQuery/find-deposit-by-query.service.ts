/* eslint-disable no-param-reassign */
import { QueryDepositDTO } from '@deposit/deposit/dto/request/query-deposit.dto';
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
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
