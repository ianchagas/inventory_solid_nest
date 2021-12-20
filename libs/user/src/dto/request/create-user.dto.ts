import { IsBoolean, IsEmail, IsOptional, IsUUID } from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

class CreateUserDTO {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNotBlank('name', {
    message: 'Campo "name" não pode ser null ou vazio.',
  })
  name: string;

  @IsEmail()
  @IsNotBlank('email', {
    message: 'Campo "email" não pode ser null ou vazio.',
  })
  email: string;

  @IsBoolean()
  admin: boolean;

  @IsNotBlank('password', {
    message: 'Campo "password" não pode ser null ou vazio.',
  })
  password: string;
}

export { CreateUserDTO };
