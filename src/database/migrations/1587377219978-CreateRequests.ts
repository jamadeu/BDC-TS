import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateRequests1587377219978 implements MigrationInterface {
  name = 'CreateRequests1587377219978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `requests` (`id` int NOT NULL AUTO_INCREMENT, `request` varchar(255) NOT NULL, `reserveds_date` datetime NULL, `seal` varchar(255) NULL, `expedition_date` datetime NULL, `invoice` varchar(255) NULL, `locality_id` int NOT NULL, `user_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
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
  }
}
