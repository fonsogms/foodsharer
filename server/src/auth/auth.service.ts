import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserAuthDto } from './dto/userAuth.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './userPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(userAuthDto: UserAuthDto): Promise<{ token: string }> {
    const user = await this.userRepository.signUp(userAuthDto);
    const payload: JwtPayload = { username: user };
    const token = this.jwtService.sign(payload);
    return { token };
  }
  async signIn(userAuthDto: UserAuthDto, res: any): Promise<void> {
    const user = await this.userRepository.validateUserPassword(userAuthDto);
    const payload: JwtPayload = { username: user };
    const token = this.jwtService.sign(payload);
    console.log(user, 'this is user');
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    } else {
      res.cookie('jid', token, {
        httpOnly: true,
        path: '/api/auth/loggedin',
      });
      res.json({ token });
    }
  }
  async loggedIn(token, req, res) {
    if (!token) {
      console.log('whats going on?');
      throw new UnauthorizedException();
    }

    let payload: JwtPayload | null = null;
    try {
      payload = await this.jwtService.verify(token);
    } catch (err) {
      console.log(err);
      throw err;
    }
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      username: username,
    });
    if (!user) {
      throw new Error('user not found');
    }

    token = this.jwtService.sign({ username: user.username });
    res.cookie('jid', token, {
      httpOnly: true,
      path: '/api/auth/loggedin',
    });
    res.json({ token });
  }
}
