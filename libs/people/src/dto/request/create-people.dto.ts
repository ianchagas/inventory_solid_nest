import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

import { AddressInCreatePeopleDTO } from './address-in-create-people.dto';

class CreatePeopleDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNotBlank('name', {
    message: 'Campo "name" não pode ser null ou vazio.',
  })
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotBlank('email', {
    message: 'Campo "email" não pode ser null ou vazio.',
  })
  email?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  ie?: string;

  @IsOptional()
  @IsString()
  @IsNotBlank('corporate_name', {
    message: 'Campo "corporate_name" não pode ser null ou vazio.',
  })
  corporate_name?: string;

  @IsOptional()
  @IsString()
  @IsNotBlank('fantasy_name', {
    message: 'Campo "fantasy_name" não pode ser null ou vazio.',
  })
  fantasy_name?: string;

  @IsOptional()
  @IsString()
  @IsNotBlank('comments', {
    message: 'Campo "comments" não pode ser null ou vazio.',
  })
  comments?: string;

  @IsOptional()
  @IsArray()
  @Type(() => AddressInCreatePeopleDTO)
  @ValidateNested({
    each: true,
  })
  address?: AddressInCreatePeopleDTO[];
}

export { CreatePeopleDTO };
