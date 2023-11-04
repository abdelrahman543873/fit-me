import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { AddWorkoutDto } from './inputs/add-workout.dto';
import { ObjectId } from 'mongoose';
import { UpdateWorkoutDto } from './inputs/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  addWorkout(trainer: ObjectId, addWorkoutDto: AddWorkoutDto) {
    return this.workoutRepository.addWorkout(trainer, addWorkoutDto);
  }

  updateWorkout(
    trainer: ObjectId,
    workoutId: ObjectId,
    updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutRepository.updateWorkout(
      trainer,
      workoutId,
      updateWorkoutDto,
    );
  }

  async getWorkout(trainer: ObjectId, workoutId: ObjectId) {
    const workouts = await this.workoutRepository.getWorkout(
      trainer,
      workoutId,
    );
    if (workouts.length) return workouts[0];
    return null;
  }

  filterWorkouts(trainer: ObjectId) {
    return this.workoutRepository.filterWorkouts(trainer);
  }

  deleteWorkout(trainer: ObjectId, workoutId: ObjectId) {
    return this.workoutRepository.deleteWorkout(trainer, workoutId);
  }
}
