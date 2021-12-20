import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

class UpdatePeopleDTO {
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

  @IsString()
  @IsOptional()
  @IsEmail()
  @IsNotBlank('email', {
    message: 'Campo "email" não pode ser null ou vazio.',
  })
  email?: string;

  @IsOptional()
  @IsNumber()
  cpf?: number;

  @IsOptional()
  @IsNumber()
  cnpj?: number;

  @IsOptional()
  @IsNumber()
  ie?: number;

  @IsString()
  @IsOptional()
  @IsNotBlank('corporate_name', {
    message: 'Campo "corporate_name" não pode ser null ou vazio.',
  })
  corporate_name?: string;

  @IsString()
  @IsOptional()
  @IsNotBlank('fantasy_name', {
    message: 'Campo "fantasy_name" não pode ser null ou vazio.',
  })
  fantasy_name?: string;

  @IsString()
  @IsOptional()
  @IsNotBlank('comments', {
    message: 'Campo "comments" não pode ser null ou vazio.',
  })
  comments?: string;
}

export { UpdatePeopleDTO };
