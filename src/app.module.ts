/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AddressModule } from 'libs/address/src';
import { CategoryModule } from 'libs/category/src';
import { InventoryModule } from 'libs/inventory/src';
import { UnitOfMeasurementModule } from 'libs/unit-of-measurement/src';
import { getMetadataArgsStorage } from 'typeorm';

import { CreateAddressController } from '@address/address/useCase/createAddress/create-address.controller';
import { DeleteAddressController } from '@address/address/useCase/deleteAddress/delete-address.controller';
import { UpdateAddressController } from '@address/address/useCase/updateAddress/update-address.controller';
import { CreateCategoryController } from '@category/category/useCase/createCategory/create-category.controller';
import { DeleteCategoryController } from '@category/category/useCase/deleteCategory/delete-category.controller';
import { FindAllCategoryController } from '@category/category/useCase/findAllCategory/find-all-category.controller';
import { FindCategoryByQueryController } from '@category/category/useCase/findCategoryByQuery/find-category-by-query.controller';
import { UpdateCategoryController } from '@category/category/useCase/updateCategory/update-category.controller';
import { DepositModule } from '@deposit/deposit';
import { CreateDepositController } from '@deposit/deposit/useCase/createDeposit/create-deposit.controller';
import { DeleteDepositController } from '@deposit/deposit/useCase/deleteDeposit/delete-deposit.controller';
import { FindAllDepositController } from '@deposit/deposit/useCase/findAllDeposit/find-all-deposit.controller';
import { FindDepositByQueryController } from '@deposit/deposit/useCase/findDepositByQuery/find-deposit-by-query.controller';
import { UpdateDepositController } from '@deposit/deposit/useCase/updateDeposit/update-deposit.controller';
import { AdjustmentMovementController } from '@inventory/inventory/useCase/adjustmentMovement/adjustment-movement.controller';
import { EntryMovementController } from '@inventory/inventory/useCase/entryMovement/entry-movement.controller';
import { EntryMovementEachOneController } from '@inventory/inventory/useCase/entryMovementEachOne/entry-movement-each-one.controller';
import { ExitMovementController } from '@inventory/inventory/useCase/exitMovement/exit-movement.controller';
import { ExitMovementEachOneController } from '@inventory/inventory/useCase/exitMovementEachOne/exit-movement-each-one.controller';
import { UpdateCostPriceController } from '@inventory/inventory/useCase/updateCostPrice/update-cost-price.controller';
import { UpdateMinMaxQuantityController } from '@inventory/inventory/useCase/updateMinMaxQuantity/update-min-max-quantity.controller';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PeopleModule } from '@people/people';
import { CreatePeopleController } from '@people/people/useCase/createPeople/create-people.controller';
import { DeletePeopleController } from '@people/people/useCase/deletePeople/delete-people.controller';
import { FindAllPeopleController } from '@people/people/useCase/findAllPeople/find-all-people.controller';
import { FindAllPeopleWithAddressController } from '@people/people/useCase/findAllPeopleWithAddress/find-all-people-with-address.controller';
import { FindPeopleByQueryController } from '@people/people/useCase/findPeopleByQuery/find-people-by-query.controller';
import { FindPeopleByQueryWithAddressController } from '@people/people/useCase/findPeopleByQueryWithAddress/find-people-by-query-with-address.controller';
import { UpdatePeopleController } from '@people/people/useCase/updatePeople/update-people.controller';
import { ProductModule } from '@product/product';
import { CreateProductController } from '@product/product/useCase/createProduct/create-product.controller';
import { DeleteProductController } from '@product/product/useCase/deleteProduct/delete-product.controller';
import { FindAllProductController } from '@product/product/useCase/findAllProduct/find-all-product.controller';
import { FindProductByQueryController } from '@product/product/useCase/findProductByQuery/find-product-by-query.controller';
import { UpdateProductController } from '@product/product/useCase/updateProduct/update-product.controller';
import { SharedModule } from '@shared/shared';
import { AuthMiddleware } from '@shared/shared/middleware/auth-middleware';
import { CreateUnController } from '@unit_of_measurement/unit-of-measurement/useCase/createUn/create-un.controller';
import { DeleteUnController } from '@unit_of_measurement/unit-of-measurement/useCase/deleteUn/delete-un.controller';
import { FindAllUnController } from '@unit_of_measurement/unit-of-measurement/useCase/findAllUn/find-all-un.controller';
import { FindUnByQueryController } from '@unit_of_measurement/unit-of-measurement/useCase/findUnByQuery/find-un-by-query.controller';
import { UpdateUnController } from '@unit_of_measurement/unit-of-measurement/useCase/updateUn/update-un.controller';
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
      .exclude(
        {
          path: '/api/melanzane/user/login',
          method: RequestMethod.POST,
        },
        {
          path: '/api/melanzane/inventory/find-all',
          method: RequestMethod.GET,
        },
        {
          path: '/api/melanzane/product/find',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(
        CreateUserController,
        UpdateUserController,
        FindUserController,
        DeleteUserController,
        CreateUnController,
        DeleteUnController,
        FindAllUnController,
        FindUnByQueryController,
        UpdateUnController,
        CreateProductController,
        DeleteProductController,
        FindAllProductController,
        FindProductByQueryController,
        UpdateProductController,
        CreatePeopleController,
        DeletePeopleController,
        FindAllPeopleController,
        FindAllPeopleWithAddressController,
        FindPeopleByQueryController,
        FindPeopleByQueryWithAddressController,
        UpdatePeopleController,
        AdjustmentMovementController,
        EntryMovementController,
        EntryMovementEachOneController,
        ExitMovementController,
        ExitMovementEachOneController,
        UpdateCostPriceController,
        UpdateMinMaxQuantityController,
        CreateDepositController,
        DeleteDepositController,
        FindAllDepositController,
        FindDepositByQueryController,
        UpdateDepositController,
        CreateCategoryController,
        DeleteCategoryController,
        FindAllCategoryController,
        FindCategoryByQueryController,
        UpdateCategoryController,
        CreateAddressController,
        DeleteAddressController,
        UpdateAddressController,
      );
  }
}
