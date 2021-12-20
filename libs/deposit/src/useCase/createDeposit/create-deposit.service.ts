import { DepositDTO } from '@deposit/deposit/dto/request/deposit.dto';
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import { DepositEntity } from '@deposit/deposit/infra/typeORM/entities/deposit.entity';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
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
