import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShipping1695807413034 implements MigrationInterface {
  name = 'CreateShipping1695807413034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`shipping\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`postalCode\` varchar(10) NOT NULL, \`country\` varchar(50) NOT NULL, \`shippingMethod\` varchar(20) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD \`shippingId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`shipping\` ADD CONSTRAINT \`FK_14f0a9c4cfa1f66bb85f84cc6c3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_8bf3257f3efd245c9f292c169c5\` FOREIGN KEY (\`shippingId\`) REFERENCES \`shipping\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_8bf3257f3efd245c9f292c169c5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`shipping\` DROP FOREIGN KEY \`FK_14f0a9c4cfa1f66bb85f84cc6c3\``,
    );
    await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`shippingId\``);
    await queryRunner.query(`DROP TABLE \`shipping\``);
  }
}
