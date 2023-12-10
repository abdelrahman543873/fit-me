import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddHistoryDto } from './add-history.dto';
import { Transform } from 'class-transformer';
import { utcStandardDateTransformer } from '../../shared/utils/utc-standard-date-transformer';
import { IsDate, Allow } from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';
import { IsClientSubscribed } from '../../subscription/validators/subscribed-client.validator';

export class FilterHistoryDto extends PartialType(AddHistoryDto) {
  @ValidateIfDefined()
  @IsDate()
  @Transform(utcStandardDateTransformer)
  createdAt?: Date;

  @ValidateIfDefined()
  @IsClientSubscribed()
  @IsExistingClient()
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client?: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
