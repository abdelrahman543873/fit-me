import { Body, Controller, Post } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { AddWorkoutExerciseDto } from './inputs/add-workout-exercise.dto';

@Controller('workout-exercise')
export class WorkoutExerciseController {
  constructor(private workoutExerciseService: WorkoutExerciseService) {}

  @Post()
  async addWorkoutExercise(
    @Body() addWorkoutExerciseDto: AddWorkoutExerciseDto,
  ) {
    return await this.workoutExerciseService.addWorkoutExercise(
      addWorkoutExerciseDto,
    );
  }
}
