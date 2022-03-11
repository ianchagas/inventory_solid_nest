import { IsBoolean, IsEmail, IsOptional, IsUUID } from 'class-validator';

import { IsNotBlank } from '@shared/shared/decorators/is-not-blank.decorator';

class UpdateUserDTO {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  @IsNotBlank('name', {
    message: 'Campo "name" não pode ser null ou vazio.',
  })
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotBlank('email', {
    message: 'Campo "email" não pode ser null ou vazio.',
  })
  email?: string;

  @IsOptional()
  @IsBoolean()
  admin?: boolean;

  @IsOptional()
  @IsNotBlank('password', {
    message: 'Campo "password" não pode ser null ou vazio.',
  })
  password?: string;
}

export { UpdateUserDTO };
