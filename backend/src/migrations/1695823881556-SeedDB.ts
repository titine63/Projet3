import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1695823881556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`users\`(pseudo, email, password) VALUES ('jesse', 'vallantjesse@live.com', 'rigoulet'),
        ('khaled', 'khaled.mofleh707@gmail.com', 'mofleh'),
        ('sandrine', 'sblanchonnet@yahoo.fr', 'blanchonnet');
        `);

    await queryRunner.query(`INSERT INTO \`product\` (title, description, price, size, clothing_type, brand, color, category, state, userId) VALUES ('Jean', 'Un classique du dressing', 32.86, 'XL', 'Jean', 'Zara', 'Gris', 'Femme', 'Acceptable', 3),
        ('Veste', "Idéal pour l'été", 20.37, 'XS', 'Veste', 'Lacoste', 'Gris', 'Femme', 'Neuf', 3),
        ('T-shirt', 'Un classique du dressing', 23.34, 'S', 'T-shirt', 'Zara', 'Bleu', 'Enfant', 'Bon', 1),
        ('T-shirt', 'Neuf avec étiquette', 143.27, 'M', 'Femme', 'T-shirt', 'Noir', 'Femme', 'Neuf', 3),
        ('Jean', 'Un classique du dressing', 70.36, 'S', 'Jean', 'Levis', 'Blanc', 'Homme', 'Acceptable', 2),
        ('Short', 'Un classique du dressing', 57.96, 'XXL', 'Short', 'H&M', 'Blanc', 'Homme', 'Acceptable', 2),
        ('Robe', "Chaud pour l'hiver", 54.68, 'M', 'Robe', 'Gucci', 'Vert', 'Femme', 'Neuf', 3),
        ('Short', 'Un classique du dressing', 24.06, 'M', 'Short', 'Nike', 'Vert', 'Enfant', 'Neuf', 1),
        ('Jean', "Chaud pour l'hiver", 29.68, 'L', 'Jean', 'Nike', 'Noir', 'Femme', 'Neuf', 3),
        ('Jean', 'Design élégant', 138.79, 'S', 'Jean', 'H&M', 'Gris', 'Homme', 'Bon', 2),
        ('Pull', 'Un classique du dressing', 79.21, 'S', 'Pull', 'H&M', 'Blanc', 'Enfant', 'Comme neuf', 1),
        ('Chaussures', 'Un classique du dressing', 107.32, 'M', 'Chaussures', 'Gucci', 'Rouge', 'Femme', 'Neuf', 3),
        ('Chapeau', "Chaud pour l'hiver", 89.47, 'XL', 'Chapeau', 'Lacoste', 'Bleu', 'Enfant', 'Comme neuf', 1),
        ('Jean', 'Design élégant', 14.66, 'M', 'Jean', 'Adidas', 'Vert', 'Enfant', 'Comme neuf', 1),
        ('Chapeau', "Idéal pour l'été", 80.91, 'L', 'Chapeau', 'Lacoste', 'Bleu', 'Femme', 'Comme neuf', 3),
        ('T-shirt', 'Confortable et à la mode', 83.16, 'L', 'Homme', 'T-shirt', 'Vert', 'Homme', 'Acceptable', 2),
        ('Écharpe', 'Confortable et à la mode', 21.41, 'XL', 'Écharpe', 'Zara', 'Gris', 'Homme', 'Comme neuf', 2),
        ('Chemise', "Idéal pour l'été", 121.2, 'M', 'Chemise', 'Adidas', "Devred", 'Femme', 'Neuf', 3),
        ('Chaussures', 'En bon état, porté quelques fois', 76.9, 'XS', 'Chaussures', 'Adidas', 'Gris', 'Homme', 'Comme neuf', 2),
        ('Pull', 'Confortable et à la mode', 25.33, 'XXL', 'Pull', 'Levis', 'Noir', 'Femme', 'Neuf', 3);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`product\``);

    await queryRunner.query(`DELETE FROM \`users\``);
  }
}
