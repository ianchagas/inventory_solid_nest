import { AddressEntity } from '@address/address/infra/typeORM/entities/address.entity';

export class MockAddress {
  static AddressData(): AddressEntity {
    const mockCreateNewAddress = new AddressEntity();

    mockCreateNewAddress.street = 'Trav. Paulo Grah';
    mockCreateNewAddress.district = 'Laranjeiras';
    mockCreateNewAddress.city = 'Rio do Sul';
    mockCreateNewAddress.uf = 'SC';
    mockCreateNewAddress.number = 286;
    mockCreateNewAddress.complement = 'Perto de lugar nenhum';
    mockCreateNewAddress.comments = 'Obs de Teste';

    return mockCreateNewAddress;
  }
}
