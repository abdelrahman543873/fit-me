import { Injectable } from '@nestjs/common';
import { MealRepository } from './meal.repository';
import { AddMealDto } from './inputs/add-meal.dto';
import { ObjectId } from 'mongoose';
import { UpdateMealDto } from './inputs/update-meal.dto';

@Injectable()
export class MealService {
  constructor(private readonly mealRepository: MealRepository) {}

  addMeal(trainer: ObjectId, addMealDto: AddMealDto) {
    return this.mealRepository.addMeal(trainer, addMealDto);
  }

  updateMeal(trainer: ObjectId, id: ObjectId, updateMealDto: UpdateMealDto) {
    return this.mealRepository.updateMeal(trainer, id, updateMealDto);
  }
}
