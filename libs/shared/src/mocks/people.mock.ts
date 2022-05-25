import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { MockAddress } from './address.mock';

export class MockPeople {
  static PeopleDataWithAddress(): PeopleEntity {
    const mockCreateNewPeople = new PeopleEntity();

    mockCreateNewPeople.name = 'Teste';
    mockCreateNewPeople.email = 'ianchagassalgado@hotmail.com';
    mockCreateNewPeople.cpf = '46971401093';
    mockCreateNewPeople.cnpj = '88827796000100';
    mockCreateNewPeople.ie = '901069094164';
    mockCreateNewPeople.corporate_name = 'Empresa de Teste';
    mockCreateNewPeople.fantasy_name = 'Nome Fantasia de Teste';
    mockCreateNewPeople.comments = 'Observação de Teste';
    mockCreateNewPeople.address = [MockAddress.AddressData()];

    return mockCreateNewPeople;
  }

  static PeopleDataWithoutAddress(): PeopleEntity {
    const mockCreateNewPeople = new PeopleEntity();

    mockCreateNewPeople.name = 'Teste';
    mockCreateNewPeople.email = 'ianchagassalgado@hotmail.com';
    mockCreateNewPeople.cpf = '46971401093';
    mockCreateNewPeople.cnpj = '88827796000100';
    mockCreateNewPeople.ie = '901069094164';
    mockCreateNewPeople.corporate_name = 'Empresa de Teste';
    mockCreateNewPeople.fantasy_name = 'Nome Fantasia de Teste';
    mockCreateNewPeople.comments = 'Observação de Teste';

    return mockCreateNewPeople;
  }
}
