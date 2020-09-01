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
import { Request, Response } from 'express';

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
  // no try and catch in the controller thats a nono

  //@Req() req:Request
  //req.res.setCookie()
  async signIn(
    @Body(ValidationPipe) userAuthDto: UserAuthDto,
    @Res() res: any,
  ): Promise<void> {
    console.log('working?');
    await this.authService.signIn(userAuthDto, res);
  }
  @Post('/loggedin')
  async loggedIn(@Req() req: Request, @Res() res: Response) {
    let token = req.cookies.jid;
    await this.authService.loggedIn(token, req, res);
  }
}
