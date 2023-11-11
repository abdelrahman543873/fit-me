import { ObjectId } from 'mongoose';

export class CompletedFormEvent {
  client: ObjectId;
  trainer: ObjectId;
}
