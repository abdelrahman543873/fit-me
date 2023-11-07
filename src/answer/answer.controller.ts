import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AddAnswerDto } from './inputs/add-answer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('media'))
  async addAnswer(
    @Body() addAnswerDto: AddAnswerDto,
    @UploadedFile() media?: Express.Multer.File,
  ) {
    return await this.answerService.addAnswer(addAnswerDto, media);
  }
}
