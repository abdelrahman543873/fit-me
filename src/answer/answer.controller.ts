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
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('answer')
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
