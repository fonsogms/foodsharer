import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserAuthDto } from './dto/userAuth.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  async singUp(@Body(ValidationPipe) userAuthDto: UserAuthDto) {
    return this.authService.signUp(userAuthDto);
  }
}
