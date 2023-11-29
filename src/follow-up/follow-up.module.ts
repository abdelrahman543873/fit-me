import { Module } from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { FollowUpController } from './follow-up.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowUpRepository } from './follow-up.repository';
import { FollowUp, FollowUpSchema } from './follow-up.schema';
import { ExistingFollowUpValidator } from './validators/existing-follow-up.validator';
import { FollowUpOwnerValidator } from './validators/follow-up-owner.validator';
import { QuestionOfFollowUpValidator } from './validators/question-of-follow-up.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FollowUp.name, schema: FollowUpSchema },
    ]),
  ],
  providers: [
    FollowUpService,
    FollowUpRepository,
    ExistingFollowUpValidator,
    FollowUpOwnerValidator,
    QuestionOfFollowUpValidator,
  ],
  controllers: [FollowUpController],
})
export class FollowUpModule {}
