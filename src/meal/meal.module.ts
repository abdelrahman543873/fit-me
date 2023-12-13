import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meal, MealSchema } from './meal.schema';
import { MealRepository } from './meal.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meal.name, schema: MealSchema }]),
  ],
  providers: [MealService, MealRepository],
  controllers: [MealController],
})
export class MealModule {}
