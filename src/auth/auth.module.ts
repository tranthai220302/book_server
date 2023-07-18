import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/user';
import { Postt } from '../Entity/post';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "SECRET_jwt",
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([User, Postt])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
