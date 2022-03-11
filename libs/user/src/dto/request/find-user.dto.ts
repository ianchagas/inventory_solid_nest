import { IsEmail } from 'class-validator';

class FindUserDTO {
  id?: number;
  uuid?: string;
  name?: string;

  @IsEmail()
  email?: string;

  admin?: boolean;
}

export { FindUserDTO };
