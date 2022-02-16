import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

/* 3 things about this strategy file:
 - this file gets fired up when login is called (which will fire up the authService.validateUser method)
 - super() is meant to handle passport strategy options
 - validate is to handle the verifycallback function 
   (standard for every passport strategy, customisable based on our requirements)
   this function in passport will create a req.user object populated with whatever you returned (in this case user object)
*/

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authService:AuthService){
    // set the options of the passport local strategy to default (username and password)
    super();
  };

  // set the verifycallback function to call the validateUser
  async validate(username: string, password: string): Promise<any>{
    const user = await this.authService.validateUser(username, password);
    if(!user){
      throw new UnauthorizedException();
    } else {
      return user;
    };
  };

}