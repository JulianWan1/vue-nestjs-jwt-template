import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( 
    private readonly usersService:UsersService,
    private readonly jwtService: JwtService  
    ){};


  // Local Strat Related 
  validPassword(password: string, hash: string, salt: string): Boolean{
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
  };

  async validateUser(username: string, password:string): Promise<any>{
    const user = await this.usersService.findUser(username);

    if (user){

      const salt = user.salt;
      const hash = user.hash;
      const isValid = this.validPassword(password, hash, salt);

      if (isValid){
        return user;
        // Potentially set JWT issuance method here (currently set on the login method below)
      };

      return null;

    } else {
      throw new HttpException('No User Found', 400);
    };
  };


  // JWT Strat Related
  async login(user: any){
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  };

};
