import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProgramWorkoutService } from './program-workout.service';
import { AddProgramWorkoutsDto } from './inputs/add-program-workouts.dto';
import { IsUserInArray } from '../shared/decorators/is-user-in-array.decorator';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('program-workout')
export class ProgramWorkoutController {
  constructor(private readonly programWorkoutService: ProgramWorkoutService) {}

  @Post('bulk')
  @IsUserInArray('programWorkouts')
  @UseInterceptors(RequestInBodyInterceptor)
  async addProgramWorkout(@Body() addProgramWorkouts: AddProgramWorkoutsDto) {
    return this.programWorkoutService.addProgramWorkout(addProgramWorkouts);
  }
}
