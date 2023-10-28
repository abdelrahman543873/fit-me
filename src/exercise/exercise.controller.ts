import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AddExerciseDto } from './inputs/add-exercise.dto';
import { ExerciseService } from './exercise.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

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
  ) {
    return await this.exerciseService.addExercise(
      request.user._id,
      addExerciseDto,
      media,
    );
  }
}
