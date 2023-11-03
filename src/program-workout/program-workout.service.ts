import { Injectable } from '@nestjs/common';
import { AddProgramWorkoutsDto } from './inputs/add-program-workouts.dto';
import { ProgramWorkoutRepository } from './program-workout.repository';

@Injectable()
export class ProgramWorkoutService {
  constructor(
    private readonly programWorkoutRepository: ProgramWorkoutRepository,
  ) {}
  addProgramWorkout(addProgramWorkouts: AddProgramWorkoutsDto) {
    return this.programWorkoutRepository.addProgramWorkouts(addProgramWorkouts);
  }
}
