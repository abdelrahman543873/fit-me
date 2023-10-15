import { ObjectId, Types } from 'mongoose';

export class ClientRegisteredEvent {
  clientId: ObjectId;
  trainerId: Types.ObjectId;
}
