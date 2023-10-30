import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { AddWorkoutDto } from './inputs/add-workout.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  addWorkout(trainer: ObjectId, addWorkoutDto: AddWorkoutDto) {
    return this.workoutRepository.addWorkout(trainer, addWorkoutDto);
  }

  filterWorkouts(trainer: ObjectId) {
    return this.workoutRepository.filterWorkouts(trainer);
  }
}
