/* eslint-disable no-param-reassign */
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import { DepositRepository } from '@deposit/deposit/infra/typeORM/repositories/deposit.repository';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from '@shared/shared/util/generic-validation-if-exists-return-querys';

@Injectable()
export class DeleteDepositService {
  constructor(
    @Inject(DepositRepository)
    private depositRepository: IDepositRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const DepositExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.depositRepository,
      );

    const DepositId = DepositExists.id;

    const FindConflictInDepositAndProduct =
      await this.productRepository.findByDepositId(DepositId);

    if (FindConflictInDepositAndProduct) {
      throw new ConflictException(
        'Não é possível excluir. Deposito associado a um ou mais produtos',
      );
    }

    return this.depositRepository.delete(DepositId);
  }
}
