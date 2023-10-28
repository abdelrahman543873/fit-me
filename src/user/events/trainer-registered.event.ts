import { ObjectId } from 'mongoose';

export class TrainerRegisteredEvent {
  trainer: ObjectId;
}
