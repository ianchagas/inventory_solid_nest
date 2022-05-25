/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
import spyObject from 'jest-spy-object';
import { v4 as uuid } from 'uuid';

import { AddressRepository } from '@address/address/infra/typeORM/repositories/address.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PeopleRepository } from '@people/people/infra/typeORM/repositories/people.repository';
import {
  mockAddressRepository,
  mockPeopleRepository,
} from '@shared/shared/mocks';
import { MockAddress } from '@shared/shared/mocks/address.mock';

import { UpdateAddressService } from './update-address.service';

describe('Update address', () => {
  let updateAddressService: UpdateAddressService;
  let mockUpdateAddress = MockAddress.AddressData();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAddressService,
        { provide: AddressRepository, useValue: mockAddressRepository },
        { provide: PeopleRepository, useValue: mockPeopleRepository },
      ],
    }).compile();
    jest.resetAllMocks();

    updateAddressService =
      module.get<UpdateAddressService>(UpdateAddressService);
  });

  it('Should be defined', () => {
    expect(updateAddressService).toBeDefined();
  });
  describe('Update Address', () => {
    beforeEach(() => {
      jest.restoreAllMocks();

      spyObject(mockAddressRepository);
      spyObject(mockPeopleRepository);
    });
    it('Should be throw a exception when people is not found before update address', async () => {
      jest
        .spyOn(mockPeopleRepository, 'findPeopleByIUUID')
        .mockReturnValue(null);
      await updateAddressService
        .execute({
          uuid: uuid(),
          updateAddressDTO: mockUpdateAddress,
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error).toMatchObject({
            message: 'Entidade não encontrada',
          });
        });
    });
    it('Should be update address and return the same', async () => {
      // Action
      const result = await updateAddressService.execute({
        uuid: uuid(),
        updateAddressDTO: mockUpdateAddress,
      });

      // Assert
      expect(undefined).toEqual(result);
    });
  });
});
