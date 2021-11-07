import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Inventory1634477989389 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventory',
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
          { name: 'quantity', type: 'int' },
          { name: 'min_quantity', type: 'int', isNullable: true },
          { name: 'max_quantity', type: 'int', isNullable: true },
          { name: 'cost_price', type: 'decimal', isNullable: true },
          { name: 'id_product', type: 'int' },
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
            name: 'FKProductInventory',
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            columnNames: ['id_product'],
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inventory');
  }
}
