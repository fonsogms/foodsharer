import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/food')
@UseGuards(AuthGuard())
export class FoodController {
  @Get('/test')
  async test() {
    console.log('happening?');
    return 'working';
  }
}
