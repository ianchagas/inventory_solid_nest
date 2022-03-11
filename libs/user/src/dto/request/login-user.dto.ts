import { IsEmail, IsString } from 'class-validator';

class LoginUserDTO {
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}

export { LoginUserDTO };
