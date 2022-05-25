import { hash } from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDefaultAdminUser1653437042387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('12345678', 8);

    await queryRunner.query(`
    INSERT INTO "user" (name, email, "admin", "password", created_at)
    VALUES ('admin_name', 'admin@admin.com', true, '${password}', now())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from "user" where email = 'admin@admin.com'`,
    );
  }
}
