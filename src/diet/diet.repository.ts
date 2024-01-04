import { Diet, DietDocument } from './diet.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddDietDto } from './inputs/add-diet.dto';
import { UpdateDietDto } from './inputs/update-diet.dto';

export class DietRepository extends BaseRepository<Diet> {
  constructor(
    @InjectModel(Diet.name)
    private dietSchema: Model<DietDocument>,
  ) {
    super(dietSchema);
  }

  addDiet(trainer: ObjectId, addDietDto: AddDietDto) {
    return this.dietSchema.create({ ...addDietDto, trainer });
  }

  updateDiet(id: ObjectId, trainer: ObjectId, updateDietDto: UpdateDietDto) {
    return this.dietSchema.findOneAndUpdate(
      { _id: id, trainer },
      { ...updateDietDto },
      { new: true },
    );
  }

  getDiet(id: ObjectId, trainer: ObjectId) {
    return this.dietSchema.findOne({ _id: id, trainer }).populate('meals');
  }
}
