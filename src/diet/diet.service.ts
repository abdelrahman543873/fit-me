import { Injectable } from '@nestjs/common';
import { DietRepository } from './diet.repository';
import { AddDietDto } from './inputs/add-diet.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class DietService {
  constructor(private readonly dietRepository: DietRepository) {}

  addDiet(trainer: ObjectId, addDietDto: AddDietDto) {
    return this.dietRepository.addDiet(trainer, addDietDto);
  }
}
