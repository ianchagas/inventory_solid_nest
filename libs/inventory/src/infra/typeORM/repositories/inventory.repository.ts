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

  async initialMovementInCreateProduct({
    id_product,
    quantity,
    cost_price,
  }: InventoryDTO): Promise<InventoryEntity> {
    const CreateInitialMovement = this.inventoryRepository.create({
      id_product,
      quantity,
      cost_price,
    });
    const SaveInitialMovement = await this.inventoryRepository.save(
      CreateInitialMovement,
    );

    return SaveInitialMovement;
  }
  async entryMovementEachOne(data: InventoryDTO): Promise<InventoryEntity> {
    return;
  }
}

export { InventoryRepository };
