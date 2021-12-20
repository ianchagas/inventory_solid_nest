import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Address1633885534786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
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
          { name: 'street', type: 'varchar' },
          { name: 'district', type: 'varchar' },
          { name: 'city', type: 'varchar' },
          { name: 'uf', type: 'varchar' },
          { name: 'number', type: 'integer' },
          { name: 'complement', type: 'varchar', isNullable: true },
          { name: 'comments', type: 'varchar', isNullable: true },
          { name: 'id_people', type: 'integer', isNullable: true },
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
            name: 'FKPeopleAddress',
            referencedTableName: 'people',
            referencedColumnNames: ['id'],
            columnNames: ['id_people'],
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
