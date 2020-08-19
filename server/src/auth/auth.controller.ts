import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserAuthDto } from './dto/userAuth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  async singUp(
    @Body(ValidationPipe) userAuthDto: UserAuthDto,
  ): Promise<string> {
    return this.authService.signUp(userAuthDto);
  }
  @Post('/signIn')
  async signIn(
    @Body(ValidationPipe) userAuthDto: UserAuthDto,
    @GetUser() user: User,
  ): Promise<{ token: string }> {
    console.log(user);
    return this.authService.signIn(userAuthDto);
  }
}
