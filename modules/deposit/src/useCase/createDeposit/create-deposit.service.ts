import { DepositDTO } from 'modules/deposit/src/dto/request/deposit.dto';
import { IDepositRepository } from 'modules/deposit/src/implementations/deposit.interface';
import { DepositEntity } from 'modules/deposit/src/infra/typeORM/entities/deposit.entity';
import { DepositRepository } from 'modules/deposit/src/infra/typeORM/repositories/deposit.repository';

import { Inject, Injectable } from '@nestjs/common';

interface IRequest {
  createDepositDTO: DepositDTO;
}

@Injectable()
export class CreateDepositService {
  constructor(
    @Inject(DepositRepository)
    private depositRepository: IDepositRepository,
  ) {}

  async execute({ createDepositDTO }: IRequest): Promise<DepositEntity> {
    const CreateDeposit = createDepositDTO;

    return this.depositRepository.create(CreateDeposit);
  }
}
