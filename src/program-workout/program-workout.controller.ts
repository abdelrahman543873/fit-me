import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProgramWorkoutService } from './program-workout.service';
import { AddProgramWorkoutsDto } from './inputs/add-program-workouts.dto';
import { IsUserInArray } from '../shared/decorators/is-user-in-array.decorator';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProgramWorkout } from './program-workout.schema';

@ApiTags('program-workout')
@ApiBearerAuth()
@Controller('program-workout')
export class ProgramWorkoutController {
  constructor(private readonly programWorkoutService: ProgramWorkoutService) {}

  @Post('bulk')
  @IsUserInArray('programWorkouts')
  @UseInterceptors(RequestInBodyInterceptor)
  async addProgramWorkout(
    @Body() addProgramWorkouts: AddProgramWorkoutsDto,
  ): Promise<ProgramWorkout[]> {
    return await this.programWorkoutService.addProgramWorkout(
      addProgramWorkouts,
    );
  }
}
