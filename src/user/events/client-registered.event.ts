import { ObjectId } from 'mongoose';

export class ClientRegisteredEvent {
  client: ObjectId;
  trainer: ObjectId;
}
