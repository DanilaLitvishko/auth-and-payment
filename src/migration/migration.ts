import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class QuestionRefactoringTIMESTAMP implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_info",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "company_name",
                    type: "varchar",
                },
                {
                    name: "phone_number",
                    type: "varchar",
                }
            ]
        }), true)

        await queryRunner.createIndex("user_info", new TableIndex({
            name: "IDX_USER_INFO",
            columnNames: ["name"]
        }));

        await queryRunner.createTable(new Table({
            name: "industries",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "user_id",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.createForeignKey("industries", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user_info",
            onDelete: "CASCADE"
        }));

        await queryRunner.createTable(new Table({
            name: "specialities",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "user_id",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.createForeignKey("specialities", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user_info",
            onDelete: "CASCADE"
        }));
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        const specialities = await queryRunner.getTable("specialities");
        const specialitiesForeignKey = specialities.foreignKeys.find(fk => fk.columnNames.indexOf("questionId") !== -1);
        await queryRunner.dropForeignKey("specialities", specialitiesForeignKey);
        const industries = await queryRunner.getTable("industries");
        const industriesForeignKey = industries.foreignKeys.find(fk => fk.columnNames.indexOf("questionId") !== -1);
        await queryRunner.dropForeignKey("industries", industriesForeignKey);
        await queryRunner.dropTable("industries");
        await queryRunner.dropIndex("user_info", "IDX_USER_INFO");
        await queryRunner.dropTable("user_info");
    }
}