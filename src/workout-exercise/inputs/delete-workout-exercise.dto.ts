import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsExistingWorkoutExercise } from '../validators/existing-workout-exercise.validator';
import { Allow } from 'class-validator';
import { User } from '../../user/user.schema';
import { IsWorkoutExerciseOwner } from '../validators/workout-exercise-owner';

export class DeleteWorkoutExerciseDto {
  @ApiProperty({ type: 'string' })
  @IsWorkoutExerciseOwner()
  @IsExistingWorkoutExercise()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?: User;
}
