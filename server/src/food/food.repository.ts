import { Repository, Entity, EntityRepository, getConnection } from 'typeorm';
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
    foodItem.owner = user.id;
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
  async getAllFood() {
    //2 * 3961 * asin(sqrt((sin(radians((latitude - ${52.714748}) / 2))) ^ 2 + cos(radians(${52.714748})) * cos(radians(latitude)) * (sin(radians((longitude - lon1) / 2))) ^ 2)) as distance

    const food = await getConnection()
      .createQueryBuilder()
      .select('*')
      .from(innerQuery => {
        return innerQuery
          .select(
            `*, 2 * 3961 * asin(sqrt((sin(radians((latitude - ${52.714748}) / 2))) ^ 2 + cos(radians(${52.714748})) * cos(radians(latitude)) * (sin(radians((longitude - ${1.684253}) / 2))) ^ 2))`,
            'distance',
          )
          .from(Food, 'food');
      }, 'subQuery')
      .where('distance > 0', { registered: true })
      .getRawMany();
    console.log(food);

    /*  const query = this.createQueryBuilder('food'); //this refers to task entity
    const result = await query
      .select('food')
      .from(Food, 'food')
      .getMany();
    console.log(result); */
    /*  query.select("2 * 3961 * asin(sqrt((sin(radians((latitude - ${52.714748}) / 2))) ^ 2 + cos(radians(${52.714748})) * cos(radians(latitude)) * (sin(radians((longitude - lon1) / 2))) ^ 2)) as distance") */
  }
}
