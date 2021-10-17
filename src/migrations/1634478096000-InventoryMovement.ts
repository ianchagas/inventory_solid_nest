import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InventoryMovement1634478096000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventory_movement',
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
          { name: 'entry_movement_quantity', type: 'int', isNullable: true },
          { name: 'exit_movement_quantity', type: 'int', isNullable: true },
          { name: 'cost_price_movement', type: 'decimal', isNullable: true },
          {
            name: 'date_movement',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          { name: 'id_inventory', type: 'int' },
        ],
        foreignKeys: [
          {
            name: 'FKInventoryMovement',
            referencedTableName: 'inventory',
            referencedColumnNames: ['id'],
            columnNames: ['id_inventory'],
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inventory_movement');
  }
}
