import { InjectModel } from '@nestjs/mongoose';
import { Meal, MealDocument } from './meal.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddMealDto } from './inputs/add-meal.dto';
import { UpdateMealDto } from './inputs/update-meal.dto';
import { GetMealsListDto } from './inputs/get-meals.list.dto';

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

  updateMeal(trainer: ObjectId, id: ObjectId, updateMealDto: UpdateMealDto) {
    return this.mealSchema.findOneAndUpdate(
      { _id: id, trainer },
      { ...updateMealDto },
      { new: true },
    );
  }

  getMealsList(getMealsListDto: GetMealsListDto) {
    return this.mealSchema.find({ _id: { $in: getMealsListDto.mealsIds } });
  }
}
