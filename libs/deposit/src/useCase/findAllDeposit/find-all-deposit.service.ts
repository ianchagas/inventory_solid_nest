/* eslint-disable no-param-reassign */
import { CategoryEntity } from '@category/category/infra/typeORM/entities/category.entity';
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllDepositService {
  constructor(
    @Inject(DepositRepository)
    private depositRepository: IDepositRepository,
  ) {}

  async execute(): Promise<CategoryEntity[]> {
    return this.depositRepository.findAll();
  }
}
