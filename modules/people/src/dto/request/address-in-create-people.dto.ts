import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { IsNotBlank } from 'modules/shared/src/decorators/is-not-blank.decorator';

class AddressInCreatePeopleDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  @IsNumber()
  id_people?: number;

  @IsString()
  @IsNotBlank('street', {
    message: 'Campo "street" enviado aninhado não pode ser vazio ou null.',
  })
  street: string;

  @IsString()
  @IsOptional()
  @IsNotBlank('district', {
    message: 'Campo "district" enviado aninhado não pode ser vazio ou null.',
  })
  district: string;

  @IsString()
  @IsNotBlank('city', {
    message: 'Campo "city" enviado aninhado não pode ser vazio ou null.',
  })
  city: string;

  @IsString()
  @IsNotBlank('uf', {
    message: 'Campo "uf" enviado aninhado não pode ser vazio ou null.',
  })
  uf: string;

  @IsNumber()
  number: number;

  @IsString()
  @IsOptional()
  @IsNotBlank('complement', {
    message: 'Campo "complement" enviado aninhado não pode ser vazio ou null.',
  })
  complement?: string;

  @IsString()
  @IsOptional()
  @IsNotBlank('comments', {
    message: 'Campo "comments" enviado aninhado não pode ser vazio ou null.',
  })
  comments?: string;
}

export { AddressInCreatePeopleDTO };
