import { Controller, Post, Request } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Post('register')
    async register(@Request() req) {
      return this.usersService.postUser(req.body.username, req.body.password)
  };   
  
}