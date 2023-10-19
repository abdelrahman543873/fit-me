import { Types } from 'mongoose';
import { isMongoId } from 'class-validator';
export const objectIdTransformer = (input) => {
  if (isMongoId(input.value)) {
    return new Types.ObjectId(input.value);
  }
  return input.value;
};
