import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-strategy';


// Sign the JWT with privateKey
// Set publicKey, privateKey & algorithm in signOptions (if not using secret)
@Module({
  imports:[
    UsersModule, 
    PassportModule,
    JwtModule.register({
      publicKey: jwtConstants.publicKey,
      privateKey: jwtConstants.privateKey,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '30s' 
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
