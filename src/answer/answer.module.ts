import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './answer.scheme';
import { AnswerRepository } from './answer.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utils/multer-file-name';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client',
        filename,
      }),
    }),
  ],
  providers: [AnswerService, AnswerRepository],
  controllers: [AnswerController],
})
export class AnswerModule {}
