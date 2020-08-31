import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuthDto } from './dto/userAuth.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  async singUp(
    @Body(ValidationPipe) userAuthDto: UserAuthDto,
  ): Promise<{ token: string }> {
    return this.authService.signUp(userAuthDto);
  }
  @Post('/signIn')
  async signIn(
    @Body(ValidationPipe) userAuthDto: UserAuthDto,
    @Res() res: any,
  ): Promise<void> {
    try {
      await this.authService.signIn(userAuthDto, res);
    } catch (err) {
      throw err;
    }
  }
  @Post('/loggedin')
  async loggedIn(@Req() req: any, @Res() res: any) {
    let token = req.cookies.jid;
    //console.log(token);
    try {
      await this.authService.loggedIn(token, req, res);
    } catch (err) {
      throw err;
    }
  }
}
