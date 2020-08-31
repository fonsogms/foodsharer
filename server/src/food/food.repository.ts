import { Repository, Entity, EntityRepository } from 'typeorm';
import { Food } from './food.entity';
import { FoodDto } from './dto/food.dto';
import { User } from 'src/auth/user.entity';
@EntityRepository(Food)
export class FoodRepository extends Repository<Food> {
  async add(foodDto: FoodDto, user: User): Promise<Food> {
    const foodItem = new Food();
    for (let key of Object.keys(foodDto)) {
      foodItem[key] = foodDto[key];
    }
    foodItem.owner = user;
    if (!foodItem.expiryDate) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      foodItem.expiryDate = tomorrow.toISOString();
    }
    try {
      const newFood = await foodItem.save();
      delete newFood.owner;
      return newFood;
    } catch (err) {
      throw err;
    }
  }
}
