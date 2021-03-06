import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

class InventoryDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  min_quantity?: number;

  @IsOptional()
  @IsNumber()
  max_quantity?: number;

  @IsOptional()
  @IsNumber()
  id_product?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(999999999999999999.99)
  @IsPositive()
  cost_price?: number;
}

export { InventoryDTO };
