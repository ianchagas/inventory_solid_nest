import { IsNumber, IsOptional, IsUUID } from 'class-validator';

class MinMaxQuantityDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  @IsNumber()
  id_product?: number;

  @IsOptional()
  @IsNumber()
  min_quantity?: number;

  @IsOptional()
  @IsNumber()
  max_quantity?: number;
}

export { MinMaxQuantityDTO };
