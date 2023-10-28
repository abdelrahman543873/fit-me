import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsExistingTrainer } from '../../user/validators/existing-trainer.validator';
import { FOLLOW_UP_FREQUENCY } from '../plan.constants';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterPlansDto {
  @ApiProperty({ type: 'string' })
  @IsExistingTrainer()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  trainer: ObjectId;

  @IsOptional()
  @IsEnum(FOLLOW_UP_FREQUENCY)
  followUpFrequency?: FOLLOW_UP_FREQUENCY;
}
