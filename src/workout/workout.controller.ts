import { Body, Controller, Post, Request } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { AddWorkoutDto } from './inputs/add-workout.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestContext } from '../shared/interfaces/request-context.interface';

@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  async addWorkout(
    @Request() request: RequestContext,
    @Body() addWorkoutDto: AddWorkoutDto,
  ) {
    return await this.workoutService.addWorkout(
      request.user._id,
      addWorkoutDto,
    );
  }
}
