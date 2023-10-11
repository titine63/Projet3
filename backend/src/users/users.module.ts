import { User } from './user.entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      dest: path.join(__dirname, '../../uploads'),
    }),
  ],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
})
export class UsersModule {}
