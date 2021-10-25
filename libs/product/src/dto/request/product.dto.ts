import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

class ProductDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  @IsString()
  @IsNotBlank('code', {
    message: 'Campo "code" não pode ser null ou vazio.',
  })
  code?: string;

  @IsOptional()
  @IsNumber()
  ean?: number;

  @IsString()
  @IsNotBlank('name', {
    message: 'Campo "name" não pode ser null ou vazio.',
  })
  name: string;

  @IsOptional()
  @IsNumber()
  id_people?: number;

  @IsNumber()
  @IsOptional()
  id_category?: number;

  @IsNotEmpty()
  @IsNumber()
  id_unit_of_measurement: number;

  @IsNotEmpty()
  @IsNumber()
  id_deposit: number;
}

export { ProductDTO };
