import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateUsers1587376624408 implements MigrationInterface {
  name = 'CreateUsers1587376624408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_2d443082eccd5198f95f2a36e2` (`login`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_2d443082eccd5198f95f2a36e2` ON `users`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `users`', undefined);
  }
}
