import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FollowUpEvents } from '../follow-up/follow-up.constants';
import { AddedFollowUpEvent } from '../follow-up/events/added-follow-up';
import { ClientDietService } from './client-diet.service';

@Injectable()
export class ClientDietListener {
  constructor(private readonly clientDietService: ClientDietService) {}

  @OnEvent(FollowUpEvents.ADDED_DIET_PROGRAM_FOLLOW_UP)
  async handleAddedFollowUp(addedFollowUpEvent: AddedFollowUpEvent) {
    await this.clientDietService.updateLastFollowUpDate(addedFollowUpEvent);
  }
}
