/* eslint-disable no-useless-return */
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UserRepository } from '@user/user/infra/typeORM/repositories/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const AuthHeaders = req.headers.authorization;

    if (AuthHeaders && (AuthHeaders as string).split(' ')[1]) {
      const Token = (AuthHeaders as string).split(' ')[1];
      const Decoded: any = jwt.verify(Token, process.env.SECRET);
      const User = await this.userRepository.findByUUID(Decoded.uuid);

      if (!User) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      if (User.admin === false) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      return next();
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
