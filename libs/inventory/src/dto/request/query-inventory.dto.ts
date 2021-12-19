import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

class QueryInventoryDTO {
  code?: string;
  ean?: string;
  name?: string;

  @IsBoolean()
  enable?: boolean;
  quantity?: number;
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(999999999999999999.99)
  @IsPositive()
  cost_price?: number;
}

export { QueryInventoryDTO };
