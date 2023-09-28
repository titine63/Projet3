import { Controller, Post, Body, Res } from '@nestjs/common'; // Ajoutez Res à vos imports
import { AuthService } from './auth.service';
import { User } from '../users/user.entity/user.entity';
import { Response } from 'express'; // Ajoutez cet import

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: User, @Res() res: Response): Promise<any> {
    const loginResult = await this.authService.login(user, res);
    if (loginResult.status === 404) {
      res.status(404).send('Utilisateur non trouvé');
      return;
    }
    res.status(200).send(loginResult);
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }
}
