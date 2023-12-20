import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

import { IsNotBlank } from 'modules/shared/src/decorators/is-not-blank.decorator';

class UnitOfMeasurementDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsString()
  @IsNotBlank('description', {
    message: 'Campo "description" não pode ser null ou vazio.',
  })
  description: string;

  @IsString()
  @IsNotBlank('initials', {
    message: 'Campo "initials" não pode ser null ou vazio.',
  })
  @Length(2, 6)
  initials: string;
}

export { UnitOfMeasurementDTO };
