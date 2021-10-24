/* eslint-disable no-param-reassign */
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';
import { IProductRepository } from '@product/product/implementations/product.interface';
import { ProductRepository } from '@product/product/infra/typeORM/repositories/product.repository';

@Injectable()
export class DeletePeopleService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
    @Inject(ProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async execute(uuid: string): Promise<void> {
    const PeopleExists = await this.peopleRepository.findPeopleByIUUID(uuid);

    if (!PeopleExists) {
      throw new NotFoundException('Entidade não encontrada');
    }

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
