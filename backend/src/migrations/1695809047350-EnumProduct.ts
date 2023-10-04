import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnumProduct1695809047350 implements MigrationInterface {
  name = 'EnumProduct1695809047350';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`category\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`category\` enum ('Homme', 'Femme', 'Enfant') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`userId\` \`userId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`category\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`category\` varchar(10) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
