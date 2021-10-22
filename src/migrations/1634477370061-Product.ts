import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Product1634477370061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'code', type: 'varchar', isNullable: true },
          { name: 'ean', type: 'bigint' },
          { name: 'name', type: 'varchar' },
          { name: 'id_people', type: 'int', isNullable: true },
          { name: 'id_category', type: 'int', isNullable: true },
          { name: 'id_unit_of_measurement', type: 'int' },
          { name: 'id_deposit', type: 'int' },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKPeopleProduct',
            referencedTableName: 'people',
            referencedColumnNames: ['id'],
            columnNames: ['id_people'],
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
          {
            name: 'FKCategoryProduct',
            referencedTableName: 'category',
            referencedColumnNames: ['id'],
            columnNames: ['id_category'],
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
          {
            name: 'FKUnitOfMeasurementProduct',
            referencedTableName: 'unit_of_measurement',
            referencedColumnNames: ['id'],
            columnNames: ['id_unit_of_measurement'],
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
          {
            name: 'FKDepositProduct',
            referencedTableName: 'deposit',
            referencedColumnNames: ['id'],
            columnNames: ['id_deposit'],
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
