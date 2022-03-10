import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO } from '@user/user/dto/request/login-user.dto';

import { LoginUserService } from './login-user.service';

@Controller()
export class LoginUserController {
  constructor(private loginUserService: LoginUserService) {}
  @Post('/api/melanzane/user/login')
  async handle(@Body() loginUserDto: LoginUserDTO): Promise<string> {
    const LoginUser = this.loginUserService.execute({ loginUserDto });
    return LoginUser;
  }
}
