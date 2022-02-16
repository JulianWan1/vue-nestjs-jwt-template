import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

// Set the endpoint for login here
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  // Login endpoint 
  // Authenticates the user through @UseGuards(LocalAuthGuard) which invokes local.strategy.ts
  // Authenticated, returns req.user object
  // With the req.user data, creates the access token (JWT) object only
  // TODO: Set the JWT in the Auhentication Header (might be FE related) 
  // http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  };

  // Protected Endpoint (This is for testing, you set your endpoints in your required controller files)
  // will return user data created 
  // from the validate method from the jwt strategy
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

}
