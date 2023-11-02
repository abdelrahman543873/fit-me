import {
  Body,
  Controller,
  Delete,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { AddWorkoutExerciseDto } from './inputs/add-workout-exercise.dto';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteWorkoutExerciseDto } from './inputs/delete-workout-exercise.dto';
import { AddWorkoutExercisesDto } from './inputs/add-workout-exercises.dto';
import { IsUserInArray } from '../shared/decorators/is-user-in-array.decorator';

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

  @Post('bulk')
  @IsUserInArray('workoutExercises')
  @UseInterceptors(RequestInBodyInterceptor)
  async addWorkoutExercises(
    @Body() addWorkoutExerciseDto: AddWorkoutExercisesDto,
  ) {
    return await this.workoutExerciseService.addWorkoutExercises(
      addWorkoutExerciseDto,
    );
  }

  @Delete()
  @UseInterceptors(RequestInBodyInterceptor)
  async deleteWorkoutExercise(
    @Body() deleteWorkoutExerciseDto: DeleteWorkoutExerciseDto,
  ) {
    return await this.workoutExerciseService.deleteWorkoutExercise(
      deleteWorkoutExerciseDto,
    );
  }
}
