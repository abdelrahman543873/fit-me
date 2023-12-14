import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meal, MealSchema } from './meal.schema';
import { MealRepository } from './meal.repository';
import { ExistingMealValidator } from './validators/existing-meal';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meal.name, schema: MealSchema }]),
  ],
  providers: [MealService, MealRepository, ExistingMealValidator],
  controllers: [MealController],
})
export class MealModule {}
