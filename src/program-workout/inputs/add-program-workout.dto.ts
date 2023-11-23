import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsProgramOwner } from '../../program/validators/program-owner.validator';
import { IsWorkoutOwner } from '../../workout/validators/workout-owner.validator';
import { Allow } from 'class-validator';

export class AddProgramWorkoutDto {
  @ApiProperty({ type: 'string' })
  @IsProgramOwner()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  program: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsWorkoutOwner()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  workout: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
