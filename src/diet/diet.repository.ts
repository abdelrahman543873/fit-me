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

  addDiet(
    trainer: ObjectId,
    addDietDto: AddDietDto,
    media?: Express.Multer.File,
  ) {
    return this.dietSchema.create({
      ...addDietDto,
      trainer,
      ...(media && {
        media: media['location'] || `${process.env.HOST}${media.filename}`,
      }),
    });
  }

  updateDiet(
    id: ObjectId,
    trainer: ObjectId,
    updateDietDto: UpdateDietDto,
    media?: Express.Multer.File,
  ) {
    return this.dietSchema.findOneAndUpdate(
      { _id: id, trainer },
      {
        ...updateDietDto,
        ...(media && {
          media: media['location'] || `${process.env.HOST}${media.filename}`,
        }),
      },
      { new: true },
    );
  }

  getDiet(id: ObjectId, trainer: ObjectId) {
    return this.dietSchema.findOne({ _id: id, trainer }).populate('meals');
  }
}
