import { Injectable } from '@nestjs/common';
import { AddFollowUpDto } from './inputs/add-follow-up.dto';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FollowUp, FollowUpDocument } from './follow-up.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { FOLLOW_UP_STATUS } from './follow-up.constants';

@Injectable()
export class FollowUpRepository extends BaseRepository<FollowUp> {
  constructor(
    @InjectModel(FollowUp.name)
    private followUpSchema: Model<FollowUpDocument>,
  ) {
    super(followUpSchema);
  }
  addFollowUp(trainer: ObjectId, addFollowUpDto: AddFollowUpDto) {
    return this.followUpSchema.create({
      trainer,
      ...addFollowUpDto,
      status: FOLLOW_UP_STATUS.REQUESTED,
    });
  }
}
