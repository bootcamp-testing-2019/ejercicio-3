import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm"

export class CreateProductTypes1563023987561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "product_type",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true)  

        await queryRunner.query(
            "INSERT INTO `product_type` (`id`, `name`) VALUES (1, 'Tomates'), (2, 'Cebollas'), (3, 'Lechuga'), (4, 'Asado'), (5, 'Milanesas'), (6, 'Huevos'), (7, 'Ajo')"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
