import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';
import { IsExistingTrainer } from '../../user/validators/existing-trainer.validator';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyTrainerDto {
  @ApiProperty({ type: 'string' })
  @IsExistingTrainer()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;
}
