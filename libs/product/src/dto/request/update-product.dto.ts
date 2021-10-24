import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

class UpdateProductDTO {
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
  @IsNotEmpty()
  @Length(13)
  ean?: number;

  @IsOptional()
  @IsString()
  @IsNotBlank('name', {
    message: 'Campo "name" não pode ser null ou vazio.',
  })
  name?: string;

  @IsOptional()
  @IsOptional()
  id_people?: number;

  @IsOptional()
  @IsOptional()
  id_category?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  id_unit_of_measurement?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  id_deposit?: number;
}

export { UpdateProductDTO };
