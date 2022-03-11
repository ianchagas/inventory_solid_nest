/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { DepositDTO } from '@deposit/deposit/dto/request/deposit.dto';
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

interface IRequest {
  uuid: string;
  updateDepositDTO: DepositDTO;
}

@Injectable()
export class UpdateDepositService {
  constructor(
    @Inject(DepositRepository)
    private depositRepository: IDepositRepository,
  ) {}

  async execute({ uuid, updateDepositDTO }: IRequest): Promise<UpdateResult> {
    const DepositExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.depositRepository,
      );

    updateDepositDTO.uuid = DepositExists.uuid;

    const UpdateDeposit = await this.depositRepository.update(updateDepositDTO);
    return UpdateDeposit.raw;
  }
}
