import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AddExerciseDto } from './inputs/add-exercise.dto';
import { ExerciseService } from './exercise.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Exercise } from './exercise.schema';
import { FilterExercisesDto } from './inputs/filter-exercises.dto';
import { DeleteExerciseDto } from './inputs/delete-exercise.dto';

@ApiBearerAuth()
@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('media'))
  async addExercise(
    @Request() request: RequestContext,
    @Body() addExerciseDto: AddExerciseDto,
    @UploadedFiles() media: Array<Express.Multer.File>,
  ): Promise<Exercise> {
    return await this.exerciseService.addExercise(
      request.user._id,
      addExerciseDto,
      media,
    );
  }

  @Get('filter')
  async filterExercises(
    @Request() request: RequestContext,
    @Query() filterExercisesDto: FilterExercisesDto,
  ): Promise<Exercise[]> {
    return await this.exerciseService.filterExercises(
      request.user._id,
      filterExercisesDto,
    );
  }

  @Delete(':id')
  async deleteExercise(
    @Request() request: RequestContext,
    @Param() deleteExerciseDto: DeleteExerciseDto,
  ) {
    return await this.exerciseService.deleteExercise(
      request.user._id,
      deleteExerciseDto,
    );
  }
}
