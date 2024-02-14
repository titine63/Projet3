import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletePaymentMethodColumn1707932736375 implements MigrationInterface {
    name = 'DeletePaymentMethodColumn1707932736375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`paymentMethod\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`status\` \`status\` varchar(20) NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_17e00e49d77ccaf7ff0e14de37b\``);
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_f6eeb74a295e2aad03b76b0ba87\``);
        await queryRunner.query(`ALTER TABLE \`wishlist\` CHANGE \`productId\` \`productId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_17e00e49d77ccaf7ff0e14de37b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_f6eeb74a295e2aad03b76b0ba87\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_f6eeb74a295e2aad03b76b0ba87\``);
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_17e00e49d77ccaf7ff0e14de37b\``);
        await queryRunner.query(`ALTER TABLE \`wishlist\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_f6eeb74a295e2aad03b76b0ba87\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_17e00e49d77ccaf7ff0e14de37b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`status\` \`status\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`paymentMethod\` varchar(20) NOT NULL`);
    }

}
