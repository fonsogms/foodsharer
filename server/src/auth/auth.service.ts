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
  async signUp(userAuthDto: UserAuthDto): Promise<string> {
    return await this.userRepository.signUp(userAuthDto);
  }
  async signIn(userAuthDto: UserAuthDto): Promise<{ token: string }> {
    const user = await this.userRepository.validateUserPassword(userAuthDto);
    const payload: JwtPayload = { username: user };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
