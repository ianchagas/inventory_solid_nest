import { UpdateResult } from 'typeorm';

import { MinMaxQuantityDTO } from '@inventory/inventory/dto/request/min-max-quantity.dto';
import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { InventoryEntity } from '../../infra/typeORM/entities/inventory.entity';
import { UpdateMinMaxQuantityService } from './update-min-max-quantity.service';

@ApiTags('Gerenciamento de Estoque')
@ApiBearerAuth()
@Controller()
export class UpdateMinMaxQuantityController {
  constructor(
    private updateMinMaxQuantityService: UpdateMinMaxQuantityService,
  ) {}
  @ApiOperation({
    summary: 'Altera a gestão de quantidade minima e máxima do estoque.',
  })
  @Put('/api/inventory/update-min-max-quantity/:ean')
  async handle(
    @Param('ean') ean: string,
    @Body() MinMaxQtde: MinMaxQuantityDTO,
  ): Promise<InventoryEntity | UpdateResult> {
    return this.updateMinMaxQuantityService.execute({ ean, MinMaxQtde });
  }
}
