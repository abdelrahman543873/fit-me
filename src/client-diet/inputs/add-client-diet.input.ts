import { Transform, Type } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ObjectId } from 'mongoose';
import { Allow, IsDate } from 'class-validator';
import { utcStandardDateTransformer } from '../../shared/utils/utc-standard-date-transformer';
import { arrayUtcStandardDateTransformer } from '../../shared/utils/array-utc-standard-date-transformer';
import { IsInRangeFollowupDate } from '../../client-program/validators/in-range-follow-up-dates.validator';
import { IsExistingDiet } from '../../diet/validators/existing-diet.validator';
import { IsDietOwner } from '../../diet/validators/diet-owner.validator';
import { IsValidStartDate } from '../validators/valid-start-date.validator';

export class AddClientDietDto {
  @ApiProperty({ type: 'string' })
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsDietOwner()
  @IsExistingDiet()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  diet: ObjectId;

  @ApiProperty({ type: 'string', format: 'date' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({ type: 'string', format: 'date' })
  @IsDate()
  @IsValidStartDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ isArray: true, type: 'string', format: 'date' })
  @IsDate({ each: true })
  @IsInRangeFollowupDate({ each: true })
  @Transform(arrayUtcStandardDateTransformer)
  followUpDates: Date[];

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
