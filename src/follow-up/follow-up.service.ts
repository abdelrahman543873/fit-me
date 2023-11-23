import { Injectable } from '@nestjs/common';
import { AddFollowUpDto } from './inputs/add-follow-up.dto';
import { FollowUpRepository } from './follow-up.repository';
import { ObjectId } from 'mongoose';
import { FilterFollowUpsDto } from './inputs/filter-follow-ups.dto';
import { User } from '../user/user.schema';

@Injectable()
export class FollowUpService {
  constructor(private readonly followUpRepository: FollowUpRepository) {}
  addFollowUp(trainer: ObjectId, addFollowUpDto: AddFollowUpDto) {
    return this.followUpRepository.addFollowUp(trainer, addFollowUpDto);
  }

  filterFollowUps(user: User, filterFollowUpsDto: FilterFollowUpsDto) {
    return this.followUpRepository.filterFollowUps(user, filterFollowUpsDto);
  }
}
