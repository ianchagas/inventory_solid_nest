/* eslint-disable no-param-reassign */
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IPeopleRepository } from 'modules/people/src/implementations/people.interface';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import { IProductRepository } from 'modules/product/src/implementations/product.interface';
import { ProductRepository } from 'modules/product/src/infra/typeORM/repositories/product.repository';
import GenericValidationIfExistsReturnQuerys from 'modules/shared/src/util/generic-validation-if-exists-return-querys';

@Injectable()
export class DeletePeopleService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const PeopleExists =
      await GenericValidationIfExistsReturnQuerys.FindPeopleExists(
        uuid,
        this.peopleRepository,
      );

    const PeopleId = PeopleExists.id;

    const FindConflictInPeopleAndProduct =
      await this.productRepository.findByPeopleId(PeopleId);

    if (FindConflictInPeopleAndProduct) {
      throw new ConflictException(
        'Não é possível excluir. Entidade associada a um ou mais produtos',
      );
    }

    return this.peopleRepository.delete(PeopleId);
  }
}
