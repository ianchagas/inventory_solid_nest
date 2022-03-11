import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class People1633885120044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'people',
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
          { name: 'name', type: 'varchar' },
          { name: 'email', type: 'varchar', isNullable: true },
          { name: 'cpf', type: 'varchar', isNullable: true },
          { name: 'cnpj', type: 'varchar', isNullable: true },
          { name: 'ie', type: 'varchar', isNullable: true },
          { name: 'corporate_name', type: 'varchar', isNullable: true },
          { name: 'fantasy_name', type: 'varchar', isNullable: true },
          { name: 'comments', type: 'varchar', isNullable: true },
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('people');
  }
}
