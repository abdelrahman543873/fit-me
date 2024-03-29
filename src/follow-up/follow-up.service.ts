import { Injectable } from '@nestjs/common';
import { AddFollowUpDto } from './inputs/add-follow-up.dto';
import { FollowUpRepository } from './follow-up.repository';
import { ObjectId } from 'mongoose';
import { FilterFollowUpsDto } from './inputs/filter-follow-ups.dto';
import { User } from '../user/user.schema';
import { AddedFollowUpEvent } from './events/added-follow-up';
import { FOLLOW_UP_TYPE, FollowUpEvents } from './follow-up.constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateFollowUpDto } from './inputs/update-follow-up.dto';

@Injectable()
export class FollowUpService {
  constructor(
    private readonly followUpRepository: FollowUpRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  addFollowUp(trainer: ObjectId, addFollowUpDto: AddFollowUpDto) {
    const addedFollowUpEvent = new AddedFollowUpEvent();
    addedFollowUpEvent.client = addFollowUpDto.client;
    if (addFollowUpDto.type === FOLLOW_UP_TYPE.WORKOUT_PROGRAM)
      this.eventEmitter.emit(
        FollowUpEvents.ADDED_WORKOUT_PROGRAM_FOLLOW_UP,
        addedFollowUpEvent,
      );
    else
      this.eventEmitter.emit(
        FollowUpEvents.ADDED_DIET_PROGRAM_FOLLOW_UP,
        addedFollowUpEvent,
      );

    return this.followUpRepository.addFollowUp(trainer, addFollowUpDto);
  }

  filterFollowUps(user: User, filterFollowUpsDto: FilterFollowUpsDto) {
    return this.followUpRepository.filterFollowUps(user, filterFollowUpsDto);
  }

  updateFollowUp(id: ObjectId, updateFollowUpDto: UpdateFollowUpDto) {
    return this.followUpRepository.updateFollowUp(id, updateFollowUpDto);
  }
}
