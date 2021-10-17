/* eslint-disable no-param-reassign */
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteDepositService {
  constructor(
    @Inject(DepositRepository)
    private depositRepository: IDepositRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const DepositExists = await this.depositRepository.findDepositByUUID(uuid);

    if (!DepositExists) {
      throw new NotFoundException('Deposito não encontrado');
    }

    const DepositId = DepositExists.id;

    return this.depositRepository.delete(DepositId);
  }
}
