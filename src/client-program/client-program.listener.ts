import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientProgramService } from './client-program.service';
import { FollowUpEvents } from '../follow-up/follow-up.constants';
import { AddedFollowUpEvent } from '../follow-up/events/added-follow-up';

@Injectable()
export class ClientProgramListener {
  constructor(private readonly clientProgramService: ClientProgramService) {}

  @OnEvent(FollowUpEvents.ADDED_FOLLOW_UP)
  async handleAddedFollowUp(addedFollowUpEvent: AddedFollowUpEvent) {
    await this.clientProgramService.updateLastFollowUpDate(addedFollowUpEvent);
  }
}
