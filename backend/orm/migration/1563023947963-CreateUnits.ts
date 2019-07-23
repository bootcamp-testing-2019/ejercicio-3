import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm"

export class CreateUnits1563023947963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "units",
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
            "INSERT INTO `units` (`id`, `name`) VALUES (1, 'unidades'), (2, 'docena'), (3, 'gr'), (4, 'kg')"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}
