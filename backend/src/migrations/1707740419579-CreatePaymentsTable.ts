import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentsTable1698765202958 implements MigrationInterface {
  name = 'CreatePaymentsTable1698765202958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_87ffe09e725a6e79f87dd6c0b69\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`payment_received_date\` timestamp NOT NULL, \`payment_to_seller_date\` timestamp NULL, \`amount\` decimal NOT NULL, \`commission\` decimal NOT NULL, \`payment_method\` varchar(20) NOT NULL, \`payment_status\` varchar(20) NOT NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_87ffe09e725a6e79f87dd6c0b69\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_d09d285fe1645cd2f0db811e293\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_d09d285fe1645cd2f0db811e293\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_87ffe09e725a6e79f87dd6c0b69\``,
    );
    await queryRunner.query(`DROP TABLE \`payment\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_87ffe09e725a6e79f87dd6c0b69\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`,
    );
  }
}
