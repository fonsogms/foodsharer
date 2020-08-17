import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typerorm.config';

@Module({
  imports: [FoodModule, AuthModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
