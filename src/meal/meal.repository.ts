import { InjectModel } from '@nestjs/mongoose';
import { Meal, MealDocument } from './meal.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddMealDto } from './inputs/add-meal.dto';

export class MealRepository extends BaseRepository<Meal> {
  constructor(
    @InjectModel(Meal.name)
    private mealSchema: Model<MealDocument>,
  ) {
    super(mealSchema);
  }

  addMeal(trainer: ObjectId, addMealDto: AddMealDto) {
    return this.mealSchema.create({ ...addMealDto, trainer });
  }
}
