import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserAuthDto } from './dto/userAuth.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async signUp(userAuthDto: UserAuthDto) {
    const { username, password } = userAuthDto;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    return userAuthDto;
  }
}
