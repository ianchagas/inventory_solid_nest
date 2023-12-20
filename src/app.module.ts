/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AddressModule } from 'modules/address/src';
import { CreateAddressController } from 'modules/address/src/useCase/createAddress/create-address.controller';
import { DeleteAddressController } from 'modules/address/src/useCase/deleteAddress/delete-address.controller';
import { UpdateAddressController } from 'modules/address/src/useCase/updateAddress/update-address.controller';
import { CategoryModule } from 'modules/category/src';
import { CreateCategoryController } from 'modules/category/src/useCase/createCategory/create-category.controller';
import { DeleteCategoryController } from 'modules/category/src/useCase/deleteCategory/delete-category.controller';
import { FindAllCategoryController } from 'modules/category/src/useCase/findAllCategory/find-all-category.controller';
import { FindCategoryByQueryController } from 'modules/category/src/useCase/findCategoryByQuery/find-category-by-query.controller';
import { UpdateCategoryController } from 'modules/category/src/useCase/updateCategory/update-category.controller';
import { DepositModule } from 'modules/deposit/src';
import { CreateDepositController } from 'modules/deposit/src/useCase/createDeposit/create-deposit.controller';
import { DeleteDepositController } from 'modules/deposit/src/useCase/deleteDeposit/delete-deposit.controller';
import { FindAllDepositController } from 'modules/deposit/src/useCase/findAllDeposit/find-all-deposit.controller';
import { FindDepositByQueryController } from 'modules/deposit/src/useCase/findDepositByQuery/find-deposit-by-query.controller';
import { UpdateDepositController } from 'modules/deposit/src/useCase/updateDeposit/update-deposit.controller';
import { InventoryModule } from 'modules/inventory/src';
import { AdjustmentMovementController } from 'modules/inventory/src/useCase/adjustmentMovement/adjustment-movement.controller';
import { EntryMovementController } from 'modules/inventory/src/useCase/entryMovement/entry-movement.controller';
import { EntryMovementEachOneController } from 'modules/inventory/src/useCase/entryMovementEachOne/entry-movement-each-one.controller';
import { ExitMovementController } from 'modules/inventory/src/useCase/exitMovement/exit-movement.controller';
import { ExitMovementEachOneController } from 'modules/inventory/src/useCase/exitMovementEachOne/exit-movement-each-one.controller';
import { UpdateCostPriceController } from 'modules/inventory/src/useCase/updateCostPrice/update-cost-price.controller';
import { UpdateMinMaxQuantityController } from 'modules/inventory/src/useCase/updateMinMaxQuantity/update-min-max-quantity.controller';
import { PeopleModule } from 'modules/people/src';
import { CreatePeopleController } from 'modules/people/src/useCase/createPeople/create-people.controller';
import { DeletePeopleController } from 'modules/people/src/useCase/deletePeople/delete-people.controller';
import { FindAllPeopleController } from 'modules/people/src/useCase/findAllPeople/find-all-people.controller';
import { FindAllPeopleWithAddressController } from 'modules/people/src/useCase/findAllPeopleWithAddress/find-all-people-with-address.controller';
import { FindPeopleByQueryController } from 'modules/people/src/useCase/findPeopleByQuery/find-people-by-query.controller';
import { FindPeopleByQueryWithAddressController } from 'modules/people/src/useCase/findPeopleByQueryWithAddress/find-people-by-query-with-address.controller';
import { UpdatePeopleController } from 'modules/people/src/useCase/updatePeople/update-people.controller';
import { ProductModule } from 'modules/product/src';
import { CreateProductController } from 'modules/product/src/useCase/createProduct/create-product.controller';
import { DeleteProductController } from 'modules/product/src/useCase/deleteProduct/delete-product.controller';
import { FindAllProductController } from 'modules/product/src/useCase/findAllProduct/find-all-product.controller';
import { FindProductByQueryController } from 'modules/product/src/useCase/findProductByQuery/find-product-by-query.controller';
import { UpdateProductController } from 'modules/product/src/useCase/updateProduct/update-product.controller';
import { SharedModule } from 'modules/shared/src';
import { AuthMiddleware } from 'modules/shared/src/middleware/auth-middleware';
import { UnitOfMeasurementModule } from 'modules/unit-of-measurement/src';
import { CreateUnController } from 'modules/unit-of-measurement/src/useCase/createUn/create-un.controller';
import { DeleteUnController } from 'modules/unit-of-measurement/src/useCase/deleteUn/delete-un.controller';
import { FindAllUnController } from 'modules/unit-of-measurement/src/useCase/findAllUn/find-all-un.controller';
import { FindUnByQueryController } from 'modules/unit-of-measurement/src/useCase/findUnByQuery/find-un-by-query.controller';
import { UpdateUnController } from 'modules/unit-of-measurement/src/useCase/updateUn/update-un.controller';
import { UserModule } from 'modules/user/src';
import { CreateUserController } from 'modules/user/src/useCase/createUser/create-user.controller';
import { DeleteUserController } from 'modules/user/src/useCase/deleteUser/delete-user.controller';
import { FindUserController } from 'modules/user/src/useCase/findUser/find-user.controller';
import { UpdateUserController } from 'modules/user/src/useCase/updateUser/update-user.controller';
import { getMetadataArgsStorage } from 'typeorm';

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
      migrations: [process.env.TYPEORM_MIGRATIONS],
      keepConnectionAlive: true,
      maxQueryExecutionTime: 1000,
      migrationsRun: true,
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
      // extra: {
      //   ssl: {
      //     rejectUnauthorized: false,
      //   },
      // },
    } as TypeOrmModuleOptions),
  ],
  providers: [],
})
export class AppModule {}
// configure(consumer: MiddlewareConsumer) {
//   consumer
//     .apply(AuthMiddleware)
//     .exclude(
//       {
//         path: '/api/user/login',
//         method: RequestMethod.POST,
//       },
//       {
//         path: '/api/inventory/find-all',
//         method: RequestMethod.GET,
//       },
//       {
//         path: '/api/product/find',
//         method: RequestMethod.GET,
//       },
//     )
//     .forRoutes(
//       CreateUserController,
//       UpdateUserController,
//       FindUserController,
//       DeleteUserController,
//       CreateUnController,
//       DeleteUnController,
//       FindAllUnController,
//       FindUnByQueryController,
//       UpdateUnController,
//       CreateProductController,
//       DeleteProductController,
//       FindAllProductController,
//       FindProductByQueryController,
//       UpdateProductController,
//       CreatePeopleController,
//       DeletePeopleController,
//       FindAllPeopleController,
//       FindAllPeopleWithAddressController,
//       FindPeopleByQueryController,
//       FindPeopleByQueryWithAddressController,
//       UpdatePeopleController,
//       AdjustmentMovementController,
//       EntryMovementController,
//       EntryMovementEachOneController,
//       ExitMovementController,
//       ExitMovementEachOneController,
//       UpdateCostPriceController,
//       UpdateMinMaxQuantityController,
//       CreateDepositController,
//       DeleteDepositController,
//       FindAllDepositController,
//       FindDepositByQueryController,
//       UpdateDepositController,
//       CreateCategoryController,
//       DeleteCategoryController,
//       FindAllCategoryController,
//       FindCategoryByQueryController,
//       UpdateCategoryController,
//       CreateAddressController,
//       DeleteAddressController,
//       UpdateAddressController,
//     );
// }
