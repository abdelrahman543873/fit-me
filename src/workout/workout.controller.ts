import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { AddWorkoutDto } from './inputs/add-workout.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestContext } from '../shared/interfaces/request-context.interface';
import { UpdateWorkoutDto } from './inputs/update-workout.dto';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';

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

  @Put(':id')
  async updateWorkout(
    @Param() workoutId: MongoIdDto,
    @Request() request: RequestContext,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return await this.workoutService.updateWorkout(
      request.user._id,
      workoutId.id,
      updateWorkoutDto,
    );
  }
  @Get('filter')
  async filterWorkouts(@Request() request: RequestContext) {
    return await this.workoutService.filterWorkouts(request.user._id);
  }

  @Get(':id')
  async getWorkout(
    @Param() workoutId: MongoIdDto,
    @Request() request: RequestContext,
  ) {
    return await this.workoutService.getWorkout(
      request.trainerId || request.user._id,
      workoutId.id,
    );
  }

  @Delete(':id')
  async deleteWorkout(
    @Param() workoutId: MongoIdDto,
    @Request() request: RequestContext,
  ) {
    return await this.workoutService.deleteWorkout(
      request.user._id,
      workoutId.id,
    );
  }
}
