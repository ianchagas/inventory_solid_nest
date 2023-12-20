/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */

import { InventoryDTO } from 'modules/inventory/src/dto/request/inventory.dto';
import { IInventoryRepository } from 'modules/inventory/src/implementations/inventory.interface';
import { Repository, UpdateResult } from 'typeorm';

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

  async findInventory(id_product: number): Promise<InventoryEntity> {
    const FindInventory = await this.inventoryRepository.findOne({
      where: {
        id_product,
      },
    });
    return FindInventory;
  }

  async findMovementExists(id_product: number): Promise<InventoryEntity[]> {
    const FindMovementExists = await this.inventoryRepository.find({
      where: {
        id_product,
      },
    });

    return FindMovementExists;
  }

  async createFirstMovement(data: InventoryDTO): Promise<InventoryEntity> {
    const SaveEntryMovementEachOne = await this.inventoryRepository.save(data);
    return SaveEntryMovementEachOne;
  }

  async updateEntryMovementEachOne(
    id_product: number,
    quantity: number,
  ): Promise<UpdateResult> {
    const UpdateQuantity = this.inventoryRepository.create({
      quantity,
    });

    const Update = await this.inventoryRepository
      .createQueryBuilder()
      .update(UpdateQuantity)
      .where({ id_product })
      .returning(['id_product', 'quantity'])
      .execute();

    return Update;
  }

  async updateEntryMovement(
    id_product: number,
    quantity: number,
    cost_price: number,
  ): Promise<UpdateResult> {
    const UpdateEntryMovement = this.inventoryRepository.create({
      quantity,
      cost_price,
    });

    const Update = await this.inventoryRepository
      .createQueryBuilder()
      .update(UpdateEntryMovement)
      .where({ id_product })
      .returning(['id_product', 'quantity', 'cost_price'])
      .execute();

    return Update;
  }

  async updateExitMovementEachOne(
    id_product: number,
    quantity: number,
  ): Promise<UpdateResult> {
    const UpdateExitMovementEachOne = this.inventoryRepository.create({
      quantity,
    });

    const Update = await this.inventoryRepository
      .createQueryBuilder()
      .update(UpdateExitMovementEachOne)
      .where({ id_product })
      .returning(['id_product', 'quantity'])
      .execute();

    return Update;
  }

  async updateExitMovement(
    id_product: number,
    quantity: number,
    cost_price: number,
  ): Promise<UpdateResult> {
    const UpdateExitMovement = this.inventoryRepository.create({
      quantity,
      cost_price,
    });

    const Update = await this.inventoryRepository
      .createQueryBuilder()
      .update(UpdateExitMovement)
      .where({ id_product })
      .returning(['id_product', 'quantity', 'cost_price'])
      .execute();

    return Update;
  }

  async updateAdjustmentMovement(
    id_product: number,
    quantity: number,
    cost_price: number,
    max_quantity: number,
    min_quantity: number,
  ): Promise<UpdateResult> {
    const UpdateAdjustmentMovement = this.inventoryRepository.create({
      quantity,
      cost_price,
      max_quantity,
      min_quantity,
    });

    const Update = await this.inventoryRepository
      .createQueryBuilder()
      .update(UpdateAdjustmentMovement)
      .where({ id_product })
      .returning([
        'id_product',
        'quantity',
        'cost_price',
        'max_quantity',
        'min_quantity',
      ])
      .execute();

    return Update;
  }

  async updateCostPrice(
    id_product: number,
    cost_price: number,
  ): Promise<UpdateResult> {
    const UpdateCostPrice = this.inventoryRepository.create({
      cost_price,
    });

    const Update = await this.inventoryRepository
      .createQueryBuilder()
      .update(UpdateCostPrice)
      .where({ id_product })
      .returning(['id_product', 'cost_price'])
      .execute();

    return Update;
  }

  async updateMinMaxQuantity(
    id_product: number,
    min_quantity: number,
    max_quantity: number,
  ): Promise<UpdateResult> {
    const UpdateMinMaxQuantity = this.inventoryRepository.create({
      min_quantity,
      max_quantity,
    });

    const Update = await this.inventoryRepository
      .createQueryBuilder()
      .update(UpdateMinMaxQuantity)
      .where({ id_product })
      .returning(['id_product', 'min_quantity', 'max_quantity'])
      .execute();

    return Update;
  }
}

export { InventoryRepository };
