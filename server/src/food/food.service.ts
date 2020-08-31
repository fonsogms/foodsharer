import { Injectable } from '@nestjs/common';
import { FoodDto } from './dto/food.dto';
import { User } from 'src/auth/user.entity';
import { FoodRepository } from './food.repository';
import { Food } from './food.entity';

@Injectable()
export class FoodService {
  constructor(private foodRepository: FoodRepository) {}
  async add(foodDto: FoodDto, user: User): Promise<Food> {
    return this.foodRepository.add(foodDto, user);
  }
}
