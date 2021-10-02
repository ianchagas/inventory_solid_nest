import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ValidationException,
  ValidationFilter,
} from '@shared/shared/filters/validation-exception.filter';

import { AppModule } from './app.module';

export class Test extends ValidationPipe {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors.map(
          (error) => `${Object.values(error.constraints).join(', ')}`,
          // `${error.property} has wrong value ${error.value}, ${Object.values(
          //   error.constraints,
          // ).join(', ')}`,
        );

        return new ValidationException(message);
      },
    }),
  );
  app.useGlobalFilters(new ValidationFilter());

  const config = new DocumentBuilder()
    .setTitle('Controle de Estoque - Melanzane')
    .setDescription(
      'Funcionalidades de controle de estoque para sistema web do Melanzane',
    )
    .setVersion('3.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // );
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(3000);
}

bootstrap();
