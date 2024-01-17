import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { UpdateExerciseDto } from './inputs/update-exercise.dto';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';

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

  @Get(':id')
  async getExercise(
    @Request() request: RequestContext,
    @Param() exerciseId: MongoIdDto,
  ) {
    return await this.exerciseService.getExercise(
      request.trainerId || request.user._id,
      exerciseId.id,
    );
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('media'))
  async updateExercise(
    @Request() request: RequestContext,
    @Param() idInput: MongoIdDto,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @UploadedFiles() media: Array<Express.Multer.File>,
  ) {
    return await this.exerciseService.updateExercise(
      request.user._id,
      idInput,
      updateExerciseDto,
      media,
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
