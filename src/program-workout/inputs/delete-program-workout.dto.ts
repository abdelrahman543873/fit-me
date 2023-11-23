import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { IsProgramWorkoutOwner } from '../validators/program-workout-owner.validator';

export class DeleteProgramWorkoutDto {
  @ApiProperty({ type: 'string' })
  @IsProgramWorkoutOwner()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
