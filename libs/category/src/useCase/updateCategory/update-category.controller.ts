import { UpdateResult } from 'typeorm';

import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uuidOptions } from '@shared/shared/pipes/uuid.config';

import { CategoryDTO } from '../../dto/request/category.dto';
import { UpdateCategoryService } from './update-category.service';

@ApiTags('Categorias de Produtos')
@ApiBearerAuth()
@Controller()
export class UpdateCategoryController {
  constructor(private updateCategoryService: UpdateCategoryService) {}
  @ApiOperation({
    summary: 'Altera informações nas categorias de produto.',
  })
  @Put('/api/category/update/:uuid')
  async handle(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() updateCategoryDTO: CategoryDTO,
  ): Promise<UpdateResult> {
    return this.updateCategoryService.execute({ uuid, updateCategoryDTO });
  }
}
