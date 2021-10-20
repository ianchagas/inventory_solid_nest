import { AddressModule } from 'libs/address/src';
import { CategoryModule } from 'libs/category/src';
import { UnitOfMeasurementModule } from 'libs/unit-of-measurement/src';
import { getMetadataArgsStorage } from 'typeorm';

import { DepositModule } from '@deposit/deposit';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PeopleModule } from '@people/people';
import { ProductModule } from '@product/product';
import { UserModule } from '@user/user';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PeopleModule,
    AddressModule,
    UnitOfMeasurementModule,
    CategoryModule,
    DepositModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      migrations: [process.env.TYPEORM_MIGRATIONS],
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
    } as TypeOrmModuleOptions),
  ],
  providers: [],
})
export class AppModule {}
