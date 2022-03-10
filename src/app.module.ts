/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AddressModule } from 'libs/address/src';
import { CategoryModule } from 'libs/category/src';
import { InventoryModule } from 'libs/inventory/src';
import { UnitOfMeasurementModule } from 'libs/unit-of-measurement/src';
import { getMetadataArgsStorage } from 'typeorm';

import { DepositModule } from '@deposit/deposit';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PeopleModule } from '@people/people';
import { ProductModule } from '@product/product';
import { SharedModule } from '@shared/shared';
import { AuthMiddleware } from '@shared/shared/middleware/auth-middleware';
import { UserModule } from '@user/user';
import { CreateUserController } from '@user/user/useCase/createUser/create-user.controller';
import { DeleteUserController } from '@user/user/useCase/deleteUser/delete-user.controller';
import { FindUserController } from '@user/user/useCase/findUser/find-user.controller';
import { UpdateUserController } from '@user/user/useCase/updateUser/update-user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    SharedModule,
    PeopleModule,
    AddressModule,
    UnitOfMeasurementModule,
    CategoryModule,
    DepositModule,
    ProductModule,
    InventoryModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: false,
      migrationsRun: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      migrations: [process.env.TYPEORM_MIGRATIONS],
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
    } as TypeOrmModuleOptions),
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: '/api/melanzane/user/login',
        method: RequestMethod.POST,
      })
      .forRoutes(
        CreateUserController,
        UpdateUserController,
        FindUserController,
        DeleteUserController,
      );
  }
}
