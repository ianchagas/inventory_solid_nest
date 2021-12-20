import { IsOptional, IsString, IsUUID } from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

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
