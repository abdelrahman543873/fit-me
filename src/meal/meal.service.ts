import { Injectable } from '@nestjs/common';
import { MealRepository } from './meal.repository';
import { AddMealDto } from './inputs/add-meal.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class MealService {
  constructor(private readonly mealRepository: MealRepository) {}

  addMeal(trainer: ObjectId, addMealDto: AddMealDto) {
    return this.mealRepository.addMeal(trainer, addMealDto);
  }
}
