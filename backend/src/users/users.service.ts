/* eslint-disable prettier/prettier */
// src/app/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async updatedUserPicture(id: number, picture: string) {
    await this.usersRepository.update(id, { picture: picture });
    return await this.usersRepository.findOne({
      select: ['picture'],
      where: { id: id },
    });
  }

  // Récupérer tous les utilisateurs
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // Récupérer un utilisateur par son ID
  async getUser(id: number): Promise<User[]> {
    return await this.usersRepository.find({
      // Properties to return. We don't want the password property.
      select: ['pseudo', 'email'],
      where: [{ id: id }],
    });
  }

  // Récupérer un utilisateur par son adresse e-mail
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: email });
  }

  // Récupérer un utilisateur par son id
  async getUserById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id: id });
  }

  // Enregistrer un nouvel utilisateur
  async saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  // Supprimer un utilisateur
  async deleteUser(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (user) {
      await this.usersRepository.remove(user);
    }
  }

  // Modifier un utilisateur existant
  async modifyUser(
    id: number,
    modifiedUser: Partial<User>,
  ): Promise<User | undefined> {
    try {
      // Charger l'utilisateur existant
      const user = await this.usersRepository.findOneOrFail({
        where: { id },
      });

      if (user) {
        // Appliquer les modifications à l'utilisateur existant
        this.usersRepository.merge(user, modifiedUser);

        // Sauvegarder l'utilisateur mis à jour
        return this.usersRepository.save(user);
      }
    } catch (error) {
      return undefined; // Renvoie undefined si l'utilisateur n'est pas trouvé ou s'il y a une erreur
    }
  }
}
