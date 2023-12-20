/* eslint-disable no-useless-return */
import { Repository } from 'typeorm';

import { InventoryMovementDTO } from 'modules/inventory/src/dto/request/inventory-movement.dto';
import { IInventoryMovementRepository } from 'modules/inventory/src/implementations/inventory-movement.interface';
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
    const NewMovement = data;
    const CreateNewInventoryMovement =
      this.inventoryMovementRepository.create(NewMovement);
    const SaveMovement = await this.inventoryMovementRepository.save(
      CreateNewInventoryMovement,
    );
    return SaveMovement;
  }
}

export { InventoryMovementRepository };
