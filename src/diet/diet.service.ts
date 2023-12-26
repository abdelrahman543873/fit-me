import { Injectable } from '@nestjs/common';
import { DietRepository } from './diet.repository';
import { AddDietDto } from './inputs/add-diet.dto';
import { ObjectId } from 'mongoose';
import { UpdateDietDto } from './inputs/update-diet.dto';

@Injectable()
export class DietService {
  constructor(private readonly dietRepository: DietRepository) {}

  addDiet(trainer: ObjectId, addDietDto: AddDietDto) {
    return this.dietRepository.addDiet(trainer, addDietDto);
  }

  updateDiet(id: ObjectId, trainer: ObjectId, updateDietDto: UpdateDietDto) {
    return this.dietRepository.updateDiet(id, trainer, updateDietDto);
  }

  getDiet(id: ObjectId, trainer: ObjectId) {
    return this.dietRepository.getDiet(id, trainer);
  }
}
