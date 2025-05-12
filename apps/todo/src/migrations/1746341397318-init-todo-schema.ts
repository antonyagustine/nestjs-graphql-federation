import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitTodoSchema1746341397318 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "todo",
        columns: [
          {
            name: "todoId",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "isCompleted",
            type: "boolean",
            default: false,
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
            isNullable: false,
            comment: "User email of the creator",
          },
          {
            name: "updatedBy",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "assigneeId",
            type: "uuid",
            isNullable: true,
          }
        ]
      })
    );

    // Add foreign key for assigneeId
    await queryRunner.createForeignKey(
      "todo",
      new TableForeignKey({
        columnNames: ["assigneeId"],
        referencedColumnNames: ["userId"],
        referencedTableName: "user",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("todo");
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("assigneeId") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("todo", foreignKey);
    }
    await queryRunner.dropTable("todo");
  }
}
