/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
import spyObject from 'jest-spy-object';
import { AddressRepository } from 'modules/address/src/infra/typeORM/repositories/address.repository';
import { PeopleRepository } from 'modules/people/src/infra/typeORM/repositories/people.repository';
import {
  address_mock,
  mockAddressRepository,
  mockPeopleRepository,
} from 'modules/shared/src/mocks';
import { MockAddress } from 'modules/shared/src/mocks/address.mock';
import { v4 as uuid } from 'uuid';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateAddressService } from './create-address.service';

describe('Create new address', () => {
  let createAddressService: CreateAddressService;
  let mockCreateNewAddress = MockAddress.AddressData();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAddressService,
        { provide: AddressRepository, useValue: mockAddressRepository },
        { provide: PeopleRepository, useValue: mockPeopleRepository },
      ],
    }).compile();
    jest.resetAllMocks();

    createAddressService =
      module.get<CreateAddressService>(CreateAddressService);
  });

  it('Should be defined', () => {
    expect(createAddressService).toBeDefined();
  });
  describe('Create Address', () => {
    beforeEach(() => {
      jest.restoreAllMocks();

      spyObject(mockAddressRepository);
      spyObject(mockPeopleRepository);
    });
    it('Should be throw a exception when people is not found before create new address', async () => {
      jest
        .spyOn(mockPeopleRepository, 'findPeopleByIUUID')
        .mockReturnValue(null);
      await createAddressService
        .execute({
          uuid: uuid(),
          createAddressDTO: mockCreateNewAddress,
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error).toMatchObject({
            message: 'Entidade não encontrada',
          });
        });
    });
    it('Should be create a new address and return the same', async () => {
      // Action
      const result = await createAddressService.execute({
        uuid: uuid(),
        createAddressDTO: mockCreateNewAddress,
      });

      // Assert
      expect(address_mock).toEqual(result);
    });
  });
});
