/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { MockAddress } from './address.mock';
import { MockPeople } from './people.mock';

export const address_mock = MockAddress.AddressData();
export const people_with_address_mock = MockPeople.PeopleDataWithAddress();
export const people_without_address_mock =
  MockPeople.PeopleDataWithoutAddress();

export const mockAddressRepository = {
  create: () => address_mock,
  update: () => address_mock,
  delete: () => null,
};

export const mockPeopleRepository = {
  create: () => people_with_address_mock,
  update: () => people_without_address_mock,
  delete: () => null,
  findAll: () => [people_without_address_mock],
  findAllWithAddress: () => [people_with_address_mock],
  findPeopleByQuery: () => [people_without_address_mock],
  findPeopleByQueryWithAddress: () => [people_with_address_mock],
  findPeopleByIUUID: () => people_without_address_mock,
};
