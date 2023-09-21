/* eslint-disable prettier/prettier */
// src/app/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

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

  // Enregistrer un nouvel utilisateur
  async saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  // Supprimer un utilisateur
  async deleteUser(user: User): Promise<void> {
    await this.usersRepository.remove(user);
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
