import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm"

export class CreateProduct1563024465978 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "product",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "amount",
                    type: "int",
                },
                {
                    name: "productTypeId",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "unitsId",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "orderId",
                    type: "int",
                    isNullable: true
                },
            ]
        }), true)  
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
