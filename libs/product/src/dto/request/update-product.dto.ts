import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

class UpdateProductDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsString()
  @IsNotBlank('code', {
    message: 'Campo "code" não pode ser null ou vazio.',
  })
  code?: string;

  @IsNumber()
  @IsNotEmpty()
  ean?: number;

  @IsString()
  @IsNotBlank('name', {
    message: 'Campo "name" não pode ser null ou vazio.',
  })
  name?: string;

  @IsOptional()
  id_people?: number;

  @IsOptional()
  id_category?: number;

  @IsNotEmpty()
  @IsNumber()
  id_unit_of_measurement?: number;

  @IsNotEmpty()
  @IsNumber()
  id_deposit?: number;
}

export { UpdateProductDTO };
