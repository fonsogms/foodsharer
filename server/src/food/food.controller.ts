import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { FoodService } from './food.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { FoodDto } from './dto/food.dto';
import { Food } from './food.entity';
import { SearchFoodDto } from './dto/searchFood.dto';
import { v2 as cloudinary } from 'cloudinary';
@Controller('api/food')
@UseGuards(AuthGuard())
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post('/add')
  async add(
    @GetUser() user: User,
    @Body(ValidationPipe) foodDto: FoodDto,
  ): Promise<Food> {
    console.log('work?');
    console.log(foodDto, 'something');
    return this.foodService.add(foodDto, user);
  }
  @Get('/')
  async getFood(searchFoodDto: SearchFoodDto) {}

  @Delete('/cloudinary')
  async deleteCloudinary(@Body() data: { id: string[] }) {
    console.log(data);
    const { id } = data;
    try {
      const res = await cloudinary.api.delete_resources([...id]);
      console.log(res);
    } catch (err) {
      throw err;
    }
  }
  /* @Post('/cloudinaryUpload')
  @UseInterceptors(FileInterceptor('file'))
  async cloudinaryUpload(@UploadedFile() file, @GetUser() user: User) {
    try {
      console.log('trying?');
      const fileInfo = await axios.post(
        'https://api.cloudinary.com/v1_1/dgktrtxjv/image/upload',
        file,
      );
      return fileInfo;
    } catch (err) {
      console.log(Object.keys(err));
      console.log(err.response.data);
      throw err;
    }
  } */
}
