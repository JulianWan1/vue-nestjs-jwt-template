import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  
  // Verify the JWT received with publicKey
  // Ensure to set algorithms for asymmetrical keys (private and public key)
  // reference: https://stackoverflow.com/questions/61606684/nestjs-authentication-using-jwt-and-private-and-public-key
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.publicKey,
      algorithms: ['RS256']
    });
  };

  // Whatever returned here will be sent to req.user for future user requests
  // (can leverage this validate function to set more info that relates to the user depending on your app)
  async validate(payload:any){
    return { userId: payload.sub, username: payload.username };
  }

} 
