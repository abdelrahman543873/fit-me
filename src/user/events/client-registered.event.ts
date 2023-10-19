import { ObjectId } from 'mongoose';

export class ClientRegisteredEvent {
  clientId: ObjectId;
  trainerId: ObjectId;
}
