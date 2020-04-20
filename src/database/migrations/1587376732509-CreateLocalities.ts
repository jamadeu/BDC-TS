import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateLocalities1587376732509
  implements MigrationInterface {
  name = 'CreateLocalities1587376732509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `localities` (`id` int NOT NULL AUTO_INCREMENT, `locality` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_7afa52270e63df8518d20b097e` (`locality`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_7afa52270e63df8518d20b097e` ON `localities`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `localities`', undefined);
  }
}
