/* eslint-disable no-param-reassign */
import { CategoryEntity } from 'modules/category/src/infra/typeORM/entities/category.entity';
import { IDepositRepository } from 'modules/deposit/src/implementations/deposit.interface';
import { DepositEntity } from 'modules/deposit/src/infra/typeORM/entities/deposit.entity';
import { DepositRepository } from 'modules/deposit/src/infra/typeORM/repositories/deposit.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllDepositService {
  constructor(
    @Inject(DepositRepository)
    private depositRepository: IDepositRepository,
  ) {}

  async execute(): Promise<DepositEntity[]> {
    return this.depositRepository.findAll();
  }
}
