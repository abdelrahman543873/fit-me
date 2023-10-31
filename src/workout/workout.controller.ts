import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { AddWorkoutDto } from './inputs/add-workout.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestContext } from '../shared/interfaces/request-context.interface';

@ApiBearerAuth()
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

  @Get('filter')
  async filterWorkouts(@Request() request: RequestContext) {
    return await this.workoutService.filterWorkouts(request.user._id);
  }
}
