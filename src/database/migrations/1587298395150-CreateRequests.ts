import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRequests1587298395150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'requests',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'request',
            type: 'varchar',
          },
          {
            name: 'reserveds_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'seal',
            type: 'varchar',
          },
          {
            name: 'expedition_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'invoice',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'locality_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'equipments_id',
            type: 'int',
            isArray: true,
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

    await queryRunner.createForeignKey(
      'requests',
      new TableForeignKey({
        name: 'RequestUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'requests',
      new TableForeignKey({
        name: 'RequestLocality',
        columnNames: ['locality_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'localities',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('requests', 'RequestUser');
    await queryRunner.dropForeignKey('requests', 'RequestLocality');
    await queryRunner.dropTable('requests');
  }
}
