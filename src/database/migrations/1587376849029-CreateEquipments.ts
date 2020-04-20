import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateEquipments1587376849029
  implements MigrationInterface {
  name = 'CreateEquipments1587376849029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `equipments` (`id` int NOT NULL AUTO_INCREMENT, `partnumber` varchar(255) NOT NULL, `serial` varchar(255) NOT NULL, `partnumber_serial` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_f1b3e76efc2c59242f088f572a` (`partnumber_serial`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_f1b3e76efc2c59242f088f572a` ON `equipments`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `equipments`', undefined);
  }
}
