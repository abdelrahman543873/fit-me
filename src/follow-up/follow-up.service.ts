import { Injectable } from '@nestjs/common';
import { AddFollowUpDto } from './inputs/add-follow-up.dto';
import { FollowUpRepository } from './follow-up.repository';
import { ObjectId } from 'mongoose';
import { FilterFollowUpsDto } from './inputs/filter-follow-ups.dto';
import { User } from '../user/user.schema';
import { AddedFollowUpEvent } from './events/added-follow-up';
import { FollowUpEvents } from './follow-up.constants';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class FollowUpService {
  constructor(
    private readonly followUpRepository: FollowUpRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  addFollowUp(trainer: ObjectId, addFollowUpDto: AddFollowUpDto) {
    const addedFollowUpEvent = new AddedFollowUpEvent();
    addedFollowUpEvent.client = addFollowUpDto.client;
    this.eventEmitter.emit(FollowUpEvents.ADDED_FOLLOW_UP, addedFollowUpEvent);
    return this.followUpRepository.addFollowUp(trainer, addFollowUpDto);
  }

  filterFollowUps(user: User, filterFollowUpsDto: FilterFollowUpsDto) {
    return this.followUpRepository.filterFollowUps(user, filterFollowUpsDto);
  }
}
