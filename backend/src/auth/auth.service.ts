//auth.service.ts
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './../users/user.entity/user.entity';
import { UsersService } from './../users/users.service';
import * as crypto from 'crypto';
import { Response } from 'express'; // Ajoutez cet import

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string): Promise<any> {
    return this.usersService.getUserByEmail(email);
  }

  public async login(
    user: User,
    res: Response,
  ): Promise<any | { status: number }> {
    return this.validate(user.email).then((userData) => {
      if (!userData || userData.password !== this.hash(user.password)) {
        return { status: 404 };
      }

      const payload = `${userData.email}`;
      const accessToken = this.jwtService.sign(payload);

      res.cookie('jwt', accessToken, {
        httpOnly: true,
        secure: false, // true si vous utilisez HTTPS
        sameSite: 'strict',
      });

      return {
        expires_in: 3600,
        access_token: accessToken,
      };
    });
  }

  public async register(user: User): Promise<any> {
    user.password = this.hash(user.password);
    return this.usersService.saveUser(user);
  }

  private hash(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }
}
