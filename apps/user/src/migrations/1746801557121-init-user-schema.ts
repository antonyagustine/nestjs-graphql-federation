import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitUserSchema1746801557121 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "userId",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: true,
            isUnique: true
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            isNullable: true
          },
          {
            name: "createdBy",
            type: "varchar",
            length: "255",
            comment: "User email of the creator",
          },
          {
            name: "updatedBy",
            type: "varchar",
            length: "255",
            isNullable: true,
          }
        ],
      })
    );

    await queryRunner.query(`
      INSERT INTO "user" ("userId", "name", "email", "createdAt", "createdBy") VALUES
      (uuid_generate_v4(), 'John Doe', 'john.doe@example.com', CURRENT_TIMESTAMP, 'system'),
      (uuid_generate_v4(), 'Jane Smith', 'jane.smith@example.com', CURRENT_TIMESTAMP, 'system'),
      (uuid_generate_v4(), 'Alice Johnson', 'alice.johnson@example.com', CURRENT_TIMESTAMP, 'system');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
