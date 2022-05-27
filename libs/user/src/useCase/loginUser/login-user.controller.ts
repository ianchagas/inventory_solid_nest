import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from '@user/user/dto/request/login-user.dto';

import { LoginUserService } from './login-user.service';

@ApiTags('Login')
@Controller()
export class LoginUserController {
  constructor(private loginUserService: LoginUserService) {}
  @ApiOperation({
    summary: 'Gera o Token JWT do usuário, criando um novo login',
  })
  @Post('/api/user/login')
  async handle(@Body() loginUserDto: LoginUserDTO): Promise<string> {
    const LoginUser = this.loginUserService.execute({ loginUserDto });
    return LoginUser;
  }
}
