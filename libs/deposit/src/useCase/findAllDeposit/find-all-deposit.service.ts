/* eslint-disable no-param-reassign */
import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
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
