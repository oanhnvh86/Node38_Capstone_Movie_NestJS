import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({})], //Import thư viện Jwt
  controllers: [AuthController],
  providers: [AuthService,ConfigService],
})
export class AuthModule {}
