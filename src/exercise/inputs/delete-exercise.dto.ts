import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteExerciseDto {
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;
}
