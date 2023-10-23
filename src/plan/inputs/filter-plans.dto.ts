import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsExistingTrainer } from '../../user/validators/existing-trainer.validator';

export class FilterPlansDto {
  @ApiProperty({ type: 'string' })
  @IsExistingTrainer()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  trainerId: ObjectId;
}
