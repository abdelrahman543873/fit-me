import { Module } from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { FollowUpController } from './follow-up.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowUpRepository } from './follow-up.repository';
import { FollowUp, FollowUpSchema } from './follow-up.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FollowUp.name, schema: FollowUpSchema },
    ]),
  ],
  providers: [FollowUpService, FollowUpRepository],
  controllers: [FollowUpController],
})
export class FollowUpModule {}
