import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEquipments1587296416557
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'equipments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'partnumber',
            type: 'varchar',
          },
          {
            name: 'serial',
            type: 'varchar',
          },
          {
            name: 'partnumber_serial',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('equipments');
  }
}
