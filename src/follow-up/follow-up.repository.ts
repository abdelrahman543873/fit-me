import { Injectable } from '@nestjs/common';
import { AddFollowUpDto } from './inputs/add-follow-up.dto';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FollowUp, FollowUpDocument } from './follow-up.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { FOLLOW_UP_STATUS } from './follow-up.constants';
import { FilterFollowUpsDto } from './inputs/filter-follow-ups.dto';
import { User } from '../user/user.schema';
import { USER_ROLE } from '../user/user.constants';

@Injectable()
export class FollowUpRepository extends BaseRepository<FollowUp> {
  constructor(
    @InjectModel(FollowUp.name)
    private followUpSchema: AggregatePaginateModel<FollowUpDocument>,
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

  completeFollowUp(id: ObjectId) {
    return this.followUpSchema.findOneAndUpdate(
      { _id: id },
      { status: FOLLOW_UP_STATUS.COMPLETED },
      { new: true },
    );
  }

  filterFollowUps(user: User, filterFollowUpsDto: FilterFollowUpsDto) {
    const { limit, offset, ...filterFollowUps } = filterFollowUpsDto;
    const aggregation = this.followUpSchema.aggregate([
      {
        $match: {
          ...(user.role === USER_ROLE.TRAINER
            ? {
                trainer: user._id,
              }
            : {
                client: user._id,
              }),
          ...filterFollowUps,
          ...(filterFollowUps.measurementTypes && {
            measurementTypes: { $in: filterFollowUps.measurementTypes },
          }),
        },
      },
    ]);
    return this.followUpSchema.aggregatePaginate(aggregation, {
      offset: offset * limit,
      limit: limit,
    });
  }
}
