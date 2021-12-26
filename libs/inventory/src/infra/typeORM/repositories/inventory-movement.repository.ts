/* eslint-disable no-useless-return */
import { Repository } from 'typeorm';

import { InventoryMovementDTO } from '@inventory/inventory/dto/request/inventory-movement.dto';
import { IInventoryMovementRepository } from '@inventory/inventory/implementations/inventory-movement.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InventoryMovementEntity } from '../entities/inventory-movement.entity';

@Injectable()
class InventoryMovementRepository implements IInventoryMovementRepository {
  constructor(
    @InjectRepository(InventoryMovementEntity)
    private inventoryMovementRepository: Repository<InventoryMovementEntity>,
  ) {}

  async createInventoryMovement(data: InventoryMovementDTO): Promise<any> {
    const CreateInventoryMovement =
      this.inventoryMovementRepository.create(data);
    console.log(CreateInventoryMovement);
  }
}

export { InventoryMovementRepository };
