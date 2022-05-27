import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryDTO } from '../../dto/request/category.dto';
import { CategoryEntity } from '../../infra/typeORM/entities/category.entity';
import { CreateCategoryService } from './create-category.service';

@ApiTags('Categorias de Produtos')
@ApiBearerAuth()
@Controller()
export class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}
  @ApiOperation({
    summary: 'Cria uma nova categoria de produto.',
  })
  @Post('/api/category/create')
  async handle(
    @Body() createCategoryDTO: CategoryDTO,
  ): Promise<CategoryEntity> {
    return this.createCategoryService.execute({ createCategoryDTO });
  }
}
