/* eslint-disable no-param-reassign */
import { UpdateResult } from 'typeorm';

import { DepositDTO } from 'modules/deposit/src/dto/request/deposit.dto';
import { IDepositRepository } from 'modules/deposit/src/implementations/deposit.interface';
import { DepositRepository } from 'modules/deposit/src/infra/typeORM/repositories/deposit.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

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
