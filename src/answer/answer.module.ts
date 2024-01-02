import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './answer.scheme';
import { AnswerRepository } from './answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  providers: [AnswerService, AnswerRepository],
  controllers: [AnswerController],
})
export class AnswerModule {}
