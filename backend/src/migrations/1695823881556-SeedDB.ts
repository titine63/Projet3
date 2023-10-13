import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1695823881556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`users\`(pseudo, email, password, picture) VALUES ('busy_gnl', 'vallantjesse@live.com', '1e95745641dcf430c74ed81201c29605ca308a527e86e72a946e0d362cfd71ab', 'uploads/khaledmo.jpeg'),
        ('khaledmo', 'khaled.mofleh707@gmail.com', 'f76ac55759dff7abb22f8a44cd1576b96c94af2ca29ab7c3c8fe6be480614881','uploads/jesse-vallant.jpeg'),
        ('titine03', 'sblanchonnet@yahoo.fr', '3c6856493101ffd766079b5110b646925e8cb86ea7d007237e15fdac352f731b', 'uploads/sandrine.jpeg');
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

    await queryRunner.query(`INSERT INTO \`shipping\` (firstname, lastname, address, city, postalCode, country, shippingMethod, userId) VALUES
        ('John', 'Doe', '123 Main St', 'Paris', '75001', 'France', 'Express', 1),
        ('Jane', 'Smith', '456 Elm St', 'Lyon', '69001', 'France', 'Standard', 2),
        ('Alice', 'Johnson', '789 Maple Ave', 'Marseille', '13001', 'France', 'Express', 3),
        ('Bob', 'Martin', '101 Pine Rd', 'Toulouse', '31000', 'France', 'Standard', 1),
        ('Charlie', 'Brown', '202 Oak Ln', 'Nice', '06000', 'France', 'Express', 2),
        ('David', 'Clark', '303 Birch Dr', 'Nantes', '44000', 'France', 'Standard', 3),
        ('Eva', 'Adams', '404 Cedar Pl', 'Strasbourg', '67000', 'France', 'Express', 1),
        ('Frank', 'Baker', '505 Fir Ct', 'Bordeaux', '33000', 'France', 'Standard', 2),
        ('Grace', 'Turner', '606 Spruce Way', 'Lille', '59000', 'France', 'Express', 3),
        ('Henry', 'White', '707 Redwood Blvd', 'Rennes', '35000', 'France', 'Standard', 1);
        `);

    await queryRunner.query(`INSERT INTO \`order\` (status, paymentMethod, userId, shippingId) VALUES
        ('pending', 'paypal', 1, 1),
        ('paid', 'stripe', 2, 2),
        ('shipped', 'paypal', 3, 3),
        ('delivered', 'stripe', 1, 4),
        ('pending', 'paypal', 2, 5),
        ('paid', 'stripe', 3, 6),
        ('shipped', 'paypal', 1, 7),
        ('delivered', 'stripe', 2, 8),
        ('pending', 'paypal', 3, 9),
        ('paid', 'stripe', 1, 10);`);

    await queryRunner.query(`UPDATE \`product\` SET orderId = 1 WHERE id = 3;`);
    await queryRunner.query(`UPDATE \`product\` SET orderId = 2 WHERE id = 1;`);
    await queryRunner.query(`UPDATE \`product\` SET orderId = 3 WHERE id = 2;`);
    await queryRunner.query(`UPDATE \`product\` SET orderId = 4 WHERE id = 5;`);
    await queryRunner.query(`UPDATE \`product\` SET orderId = 5 WHERE id = 6;`);
    await queryRunner.query(`UPDATE \`product\` SET orderId = 6 WHERE id = 7;`);
    await queryRunner.query(`UPDATE \`product\` SET orderId = 7 WHERE id = 8;`);
    await queryRunner.query(`UPDATE \`product\` SET orderId = 8 WHERE id = 9;`);
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 9 WHERE id = 10;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 10 WHERE id = 11;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 1 WHERE id = 12;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 2 WHERE id = 13;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 3 WHERE id = 14;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 4 WHERE id = 15;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 5 WHERE id = 16;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 6 WHERE id = 17;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 7 WHERE id = 18;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 8 WHERE id = 19;`,
    );
    await queryRunner.query(
      `UPDATE \`product\` SET orderId = 9 WHERE id = 20;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0`);

    await queryRunner.query(`DELETE FROM \`product\``);

    await queryRunner.query(`DELETE FROM \`users\``);

    await queryRunner.query(`DELETE FROM \`shipping\``);

    await queryRunner.query(`DELETE FROM \`order\``);
  }
}
