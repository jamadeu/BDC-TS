import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RequestRefactoring1588547937293
  implements MigrationInterface {
  name = 'RequestRefactoring1588547937293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `requests` CHANGE `request` `requestIdentification` varchar(255) NOT NULL',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `requests` CHANGE `requestIdentification` `request` varchar(255) NOT NULL',
      undefined,
    );
  }
}
