import { Injectable } from '@nestjs/common';
import { AddProgramWorkoutsDto } from './inputs/add-program-workouts.dto';
import { ProgramWorkoutRepository } from './program-workout.repository';
import { DeleteProgramWorkoutDto } from './inputs/delete-program-workout.dto';

@Injectable()
export class ProgramWorkoutService {
  constructor(
    private readonly programWorkoutRepository: ProgramWorkoutRepository,
  ) {}
  addProgramWorkout(addProgramWorkouts: AddProgramWorkoutsDto) {
    return this.programWorkoutRepository.addProgramWorkouts(addProgramWorkouts);
  }

  deleteProgramWorkout(deleteProgramWorkoutDto: DeleteProgramWorkoutDto) {
    return this.programWorkoutRepository.deleteWorkoutProgram(
      deleteProgramWorkoutDto,
    );
  }
}
