/* eslint-disable no-param-reassign */
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

import { IUnitOfMeasurementRepository } from '../../implementations/unit-of-measurement.interface';
import { UnitOfMeasurementRepository } from '../../infra/typeORM/repositories/unit-of-measurement.repository';

@Injectable()
export class DeleteUnService {
  constructor(
    @Inject(UnitOfMeasurementRepository)
    private unRepository: IUnitOfMeasurementRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const UnExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.unRepository,
      );

    const UnId = UnExists.id;

    const FindConflictInUnAndProduct = await this.productRepository.findByUnId(
      UnId,
    );

    if (FindConflictInUnAndProduct) {
      throw new ConflictException(
        'Não é possível excluir. Unidade de medida associado a um ou mais produtos',
      );
    }

    return this.unRepository.delete(UnId);
  }
}
