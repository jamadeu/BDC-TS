import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangedColumnNameInRequests1589131256297
  implements MigrationInterface {
  name = 'ChangedColumnNameInRequests1589131256297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `equipments` (`id` int NOT NULL AUTO_INCREMENT, `partnumber` varchar(255) NOT NULL, `serial` varchar(255) NOT NULL, `partnumber_serial` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_f1b3e76efc2c59242f088f572a` (`partnumber_serial`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `localities` (`id` int NOT NULL AUTO_INCREMENT, `locality` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_7afa52270e63df8518d20b097e` (`locality`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_2d443082eccd5198f95f2a36e2` (`login`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `requests` (`id` int NOT NULL AUTO_INCREMENT, `request_reference` varchar(255) NOT NULL, `reserveds_date` datetime NULL, `seal` varchar(255) NULL, `expedition_date` datetime NULL, `invoice` varchar(255) NULL, `locality_id` int NOT NULL, `user_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `requests_assigns_equipments` (`requestsId` int NOT NULL, `equipmentsId` int NOT NULL, INDEX `IDX_551f738fc180c6088fca888fc8` (`requestsId`), INDEX `IDX_44e16b51dfb8e0297a91a734e1` (`equipmentsId`), PRIMARY KEY (`requestsId`, `equipmentsId`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `requests` ADD CONSTRAINT `FK_96fe690a3a6eb1603288d35081a` FOREIGN KEY (`locality_id`) REFERENCES `localities`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `requests` ADD CONSTRAINT `FK_9e5e2eb56e3837b43e5a547be23` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `requests_assigns_equipments` ADD CONSTRAINT `FK_551f738fc180c6088fca888fc83` FOREIGN KEY (`requestsId`) REFERENCES `requests`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `requests_assigns_equipments` ADD CONSTRAINT `FK_44e16b51dfb8e0297a91a734e10` FOREIGN KEY (`equipmentsId`) REFERENCES `equipments`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `requests_assigns_equipments` DROP FOREIGN KEY `FK_44e16b51dfb8e0297a91a734e10`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `requests_assigns_equipments` DROP FOREIGN KEY `FK_551f738fc180c6088fca888fc83`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `requests` DROP FOREIGN KEY `FK_9e5e2eb56e3837b43e5a547be23`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `requests` DROP FOREIGN KEY `FK_96fe690a3a6eb1603288d35081a`',
      undefined,
    );
    await queryRunner.query(
      'DROP INDEX `IDX_44e16b51dfb8e0297a91a734e1` ON `requests_assigns_equipments`',
      undefined,
    );
    await queryRunner.query(
      'DROP INDEX `IDX_551f738fc180c6088fca888fc8` ON `requests_assigns_equipments`',
      undefined,
    );
    await queryRunner.query(
      'DROP TABLE `requests_assigns_equipments`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `requests`', undefined);
    await queryRunner.query(
      'DROP INDEX `IDX_2d443082eccd5198f95f2a36e2` ON `users`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `users`', undefined);
    await queryRunner.query(
      'DROP INDEX `IDX_7afa52270e63df8518d20b097e` ON `localities`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `localities`', undefined);
    await queryRunner.query(
      'DROP INDEX `IDX_f1b3e76efc2c59242f088f572a` ON `equipments`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `equipments`', undefined);
  }
}
