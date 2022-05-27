import { Inject, Injectable } from '@nestjs/common';
import { CreatePeopleDTO } from '@people/people/dto/request/create-people.dto';
import { IPeopleRepository } from '@people/people/implementations/people.interface';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';

interface IRequest {
  createPeopleDTO: CreatePeopleDTO;
}

@Injectable()
export class CreatePeopleService {
  constructor(
    @Inject(PeopleRepository)
    private peopleRepository: IPeopleRepository,
  ) {}

  async execute({ createPeopleDTO }: IRequest): Promise<PeopleEntity> {
    const CreatePeople = createPeopleDTO;

    // Verificar se cpf/cnpj já existe
    // Verificar se IE já existe
    // Verificar se e-mail já existe

    return this.peopleRepository.create(CreatePeople);
  }
}
