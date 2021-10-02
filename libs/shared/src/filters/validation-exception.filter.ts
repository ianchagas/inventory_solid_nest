/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BadRequestException,
    Catch,
    ExceptionFilter,
    ArgumentsHost,
  } from '@nestjs/common';
  
  export class ValidationException extends BadRequestException {
    constructor(public validationErrors: string[]) {
      super();
    }
  }
  
  @Catch(ValidationException)
  export class ValidationFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      return response.status(400).json({
        statusCode: 400,
        message:
          'Erro nos dados. Por favor, confira as informações e tente novamente',
        details: exception.validationErrors,
        error: 'Bad Request',
      });
    }
  }