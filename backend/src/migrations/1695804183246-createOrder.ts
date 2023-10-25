import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrder1695804183246 implements MigrationInterface {
  name = 'CreateOrder1695804183246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL, \`description\` text NOT NULL, \`price\` float NOT NULL, \`size\` varchar(10) NOT NULL, \`clothing_type\` varchar(20) NOT NULL, \`brand\` varchar(50) NULL, \`color\` varchar(20) NULL, \`category\` enum ('Homme', 'Femme', 'Enfant') NOT NULL, \`state\` varchar(20) NULL, \`isSold\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(20) NOT NULL DEFAULT 'pending', \`paymentMethod\` varchar(20) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` ADD \`orderId\` int NULL`);

    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_87ffe09e725a6e79f87dd6c0b69\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_87ffe09e725a6e79f87dd6c0b69\``,
    );

    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
