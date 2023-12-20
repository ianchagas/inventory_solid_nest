import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

class InventoryMovementDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  @IsNumber()
  actually_quantity?: number;

  @IsOptional()
  @IsNumber()
  entry_amount_moved?: number;

  @IsOptional()
  @IsNumber()
  exit_amount_moved?: number;

  @IsOptional()
  @IsNumber()
  id_inventory?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(999999999999999999.99)
  @IsPositive()
  actually_cost_price?: number;

  @IsOptional()
  @IsString()
  comments?: string;
}

export { InventoryMovementDTO };
