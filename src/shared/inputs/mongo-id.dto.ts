import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { Allow } from 'class-validator';

export class MongoIdDto {
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;

  @Allow()
  user?;
}
