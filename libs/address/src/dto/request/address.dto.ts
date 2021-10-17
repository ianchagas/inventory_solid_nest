import { IsNumber, IsOptional, IsUUID } from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

class AddressDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  @IsNumber()
  id_people?: number;

  @IsNotBlank('street', {
    message: 'Campo "street" enviado aninhado não pode ser vazio ou null.',
  })
  street: string;

  @IsOptional()
  @IsNotBlank('district', {
    message: 'Campo "district" enviado aninhado não pode ser vazio ou null.',
  })
  district: string;

  @IsNotBlank('city', {
    message: 'Campo "city" enviado aninhado não pode ser vazio ou null.',
  })
  city: string;

  @IsNotBlank('uf', {
    message: 'Campo "uf" enviado aninhado não pode ser vazio ou null.',
  })
  uf: string;

  @IsNumber()
  number: number;

  @IsOptional()
  @IsNotBlank('complement', {
    message: 'Campo "complement" enviado aninhado não pode ser vazio ou null.',
  })
  complement?: string;

  @IsOptional()
  @IsNotBlank('comments', {
    message: 'Campo "comments" enviado aninhado não pode ser vazio ou null.',
  })
  comments?: string;
}

export { AddressDTO };
