import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IsNotBlank } from 'modules/shared/src/decorators/is-not-blank.decorator';

class DepositDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsString()
  @IsNotBlank('name', {
    message: 'Campo "name" não pode ser null ou vazio.',
  })
  name: string;
}

export { DepositDTO };
