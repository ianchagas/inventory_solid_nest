/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */

import { InventoryDTO } from 'libs/inventory/src/dto/request/inventory.dto';
import { IInventoryRepository } from 'libs/inventory/src/implementations/inventory.interface';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InventoryEntity } from '../entities/inventory.entity';

@Injectable()
class InventoryRepository implements IInventoryRepository {
  constructor(
    @InjectRepository(InventoryEntity)
    private inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async findActuallyQuantity(id_product: number): Promise<number | undefined> {
    const FindActuallyQuantity = await this.inventoryRepository
      .createQueryBuilder('inventory')
      .select('quantity')
      .where({ id_product })
      .getRawOne();

    return FindActuallyQuantity;
  }

  async entryMovementEachOne(data: InventoryDTO): Promise<InventoryEntity> {
    const SaveEntryMovementEachOne = await this.inventoryRepository.save(data);
    return SaveEntryMovementEachOne;
  }
}

export { InventoryRepository };
