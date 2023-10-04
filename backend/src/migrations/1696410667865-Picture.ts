import { MigrationInterface, QueryRunner } from 'typeorm';

export class Picture1696410667865 implements MigrationInterface {
  name = 'Picture1696410667865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`picture\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`productId\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`picture\` ADD CONSTRAINT \`FK_67e0d834805128af89208e52f8a\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`picture\` DROP FOREIGN KEY \`FK_67e0d834805128af89208e52f8a\``,
    );
    await queryRunner.query(`DROP TABLE \`picture\``);
  }
}
