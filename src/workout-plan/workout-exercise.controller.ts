import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { AddWorkoutExerciseDto } from './inputs/add-workout-exercise.dto';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('workoutExercise')
@Controller('workout-exercise')
export class WorkoutExerciseController {
  constructor(private workoutExerciseService: WorkoutExerciseService) {}

  @Post()
  @UseInterceptors(RequestInBodyInterceptor)
  async addWorkoutExercise(
    @Body() addWorkoutExerciseDto: AddWorkoutExerciseDto,
  ) {
    return await this.workoutExerciseService.addWorkoutExercise(
      addWorkoutExerciseDto,
    );
  }
}
