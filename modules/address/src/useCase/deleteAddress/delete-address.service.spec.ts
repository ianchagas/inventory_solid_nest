/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
import spyObject from 'jest-spy-object';
import { AddressRepository } from 'modules/address/src/infra/typeORM/repositories/address.repository';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import {
  mockAddressRepository,
  mockPeopleRepository,
} from 'modules/shared/src/mocks';
import { MockPeople } from 'modules/shared/src/mocks/people.mock';
import { v4 as uuid } from 'uuid';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { DeleteAddressService } from './delete-address.service';

describe('Delete address', () => {
  let deleteAddressService: DeleteAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteAddressService,
        { provide: AddressRepository, useValue: mockAddressRepository },
        { provide: PeopleRepository, useValue: mockPeopleRepository },
      ],
    }).compile();
    jest.resetAllMocks();

    deleteAddressService =
      module.get<DeleteAddressService>(DeleteAddressService);
  });

  it('Should be defined', () => {
    expect(deleteAddressService).toBeDefined();
  });
  describe('Delete Address', () => {
    beforeEach(() => {
      jest.restoreAllMocks();

      spyObject(mockAddressRepository);
      spyObject(mockPeopleRepository);
    });
    it('Should be throw a exception when people is not found before delete address', async () => {
      jest
        .spyOn(mockPeopleRepository, 'findPeopleByIUUID')
        .mockReturnValue(null);

      const { uuid } = MockPeople.PeopleDataWithoutAddress();

      await deleteAddressService.execute(uuid).catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error).toMatchObject({
          message: 'Entidade não encontrada',
        });
      });
    });
    it('Should be delete a address by people and return null if delete is successfuly', async () => {
      // Action
      const { uuid } = MockPeople.PeopleDataWithoutAddress();
      const result = await deleteAddressService.execute(uuid);

      // Assert
      expect(null).toEqual(result);
    });
  });
});
