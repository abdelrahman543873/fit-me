import { Injectable } from '@nestjs/common';
import { DietRepository } from './diet.repository';
import { AddDietDto } from './inputs/add-diet.dto';
import { ObjectId } from 'mongoose';
import { UpdateDietDto } from './inputs/update-diet.dto';

@Injectable()
export class DietService {
  constructor(private readonly dietRepository: DietRepository) {}

  addDiet(
    trainer: ObjectId,
    addDietDto: AddDietDto,
    media?: Express.Multer.File,
  ) {
    return this.dietRepository.addDiet(trainer, addDietDto, media);
  }

  updateDiet(
    id: ObjectId,
    trainer: ObjectId,
    updateDietDto: UpdateDietDto,
    media?: Express.Multer.File,
  ) {
    return this.dietRepository.updateDiet(id, trainer, updateDietDto, media);
  }

  getDiet(id: ObjectId, trainer: ObjectId) {
    return this.dietRepository.getDiet(id, trainer);
  }
}
