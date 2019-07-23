import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm"

export class CreateProductTypesUnitsUnits1563024608009 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "product_type_units_units",
            columns: [
                {
                    name: "productTypeId",
                    type: "int",
                },
                {
                    name: "unitsId",
                    type: "int",
                },
            ]
        }), true)

        await queryRunner.createIndex("product_type_units_units", new TableIndex({
            name: "IDX_productTypeId",
            columnNames: ["productTypeId"]
        }))

        await queryRunner.createIndex("product_type_units_units", new TableIndex({
            name: "IDX_unitsId",
            columnNames: ["unitsId"]
        }))

        await queryRunner.query(
            "INSERT INTO `product_type_units_units` (`productTypeId`, `unitsId`) \
            VALUES \
                (1, 1), (1, 3), (1, 4), \
                (2, 1), (2, 3), (2, 4), \
                (3, 1), (3, 3), (3, 4), \
                (4, 3), (4, 4),         \
                (5, 1), (5, 3), (5, 4), \
                (6, 2),                 \
                (7, 1)                  \
            ;"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
