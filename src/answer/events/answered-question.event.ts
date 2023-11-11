import { ObjectId } from 'mongoose';

export class SubmittedAnswerEvent {
  form: ObjectId;
  client: ObjectId;
  trainer: ObjectId;
}
