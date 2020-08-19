import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('food')
@UseGuards(AuthGuard())
export class FoodController {}
