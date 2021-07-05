import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class PostRefactoring1625465232678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase('linkedIn');
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "username",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "confirmationCode",
                    type: "varchar",
                },
                {
                    name: "isConfirm",
                    type: "boolean",
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "industries",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "specialities",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "user_info",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "user_id",
                    type: "int",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "companyName",
                    type: "varchar",
                },
                {
                    name: "phoneNumber",
                    type: "varchar",
                },
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name:"user_info_industries",
            columns: [
                {
                    name:"userInfoId",
                    type:"int",
                },
                {
                    name:"industriesId",
                    type:"int",
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name:"user_info_specialities",
            columns: [
                {
                    name:"userInfoId",
                    type:"int",
                },
                {
                    name:"specialitiesId",
                    type:"int",
                }
            ]
        }), true);

        await queryRunner.createForeignKey("user_info_industries", new TableForeignKey({
            columnNames:["userInfoId"],
            referencedColumnNames:["id"],
            referencedTableName:"user_info",
            onDelete: "CASCADE"
        }))

        await queryRunner.createForeignKey("user_info_industries", new TableForeignKey({
            columnNames:["industriesId"],
            referencedColumnNames:["id"],
            referencedTableName:"industries",
            onDelete: "CASCADE"
        }))

        await queryRunner.createForeignKey("user_info_specialities", new TableForeignKey({
            columnNames:["userInfoId"],
            referencedColumnNames:["id"],
            referencedTableName:"user_info",
            onDelete: "CASCADE"
        }))
        
        await queryRunner.createForeignKey("user_info_specialities", new TableForeignKey({
            columnNames:["specialitiesId"],
            referencedColumnNames:["id"],
            referencedTableName:"specialities",
            onDelete: "CASCADE"
        }))

        await queryRunner.createForeignKey("user_info", new TableForeignKey({
            columnNames:["userId"],
            referencedColumnNames:["id"],
            referencedTableName:"user",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableUserInfo = await queryRunner.getTable("user_info");
        const foreignKeyUser = tableUserInfo.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("user_info", foreignKeyUser);

        const tableSpecialities = await queryRunner.getTable("user_info_specialities");
        const foreignKeySpecialitiesId = tableSpecialities.foreignKeys.find(fk => fk.columnNames.indexOf("specialitiesId") !== -1);
        await queryRunner.dropForeignKey("user_info_specialities", foreignKeySpecialitiesId);
        const foreignKeyUserInfoId = tableSpecialities.foreignKeys.find(fk => fk.columnNames.indexOf("userInfoId") !== -1);
        await queryRunner.dropForeignKey("user_info_specialities", foreignKeyUserInfoId);

        const tableIndustries = await queryRunner.getTable("user_info_industries");
        const foreignKeyIndustriesId = tableIndustries.foreignKeys.find(fk => fk.columnNames.indexOf("industriesId") !== -1);
        await queryRunner.dropForeignKey("user_info_industries", foreignKeyIndustriesId);
        const foreignKeyUserInfoId2 = tableSpecialities.foreignKeys.find(fk => fk.columnNames.indexOf("userInfoId") !== -1);
        await queryRunner.dropForeignKey("user_info_industries", foreignKeyUserInfoId2);

        await queryRunner.dropTable("user_info_specialities");
        await queryRunner.dropTable("user_info_industries");
        await queryRunner.dropTable("user_info");
        await queryRunner.dropTable("specialities");
        await queryRunner.dropTable("industries");
        await queryRunner.dropTable("user");
        await queryRunner.dropDatabase("linkedIn")
    }

}
