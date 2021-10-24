/* eslint-disable no-param-reassign */
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

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
    const UnExists = await this.unRepository.findUnByUUID(uuid);

    if (!UnExists) {
      throw new NotFoundException('Unidade de medida não encontrada');
    }
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
