import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({ secret: '¡1OF-livingTheDream!' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
