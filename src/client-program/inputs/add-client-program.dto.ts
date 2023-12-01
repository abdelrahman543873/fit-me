import { Transform, Type } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ObjectId } from 'mongoose';
import { IsExistingProgram } from '../../program/validators/existing-program.validator';
import { Allow, IsDate } from 'class-validator';
import { IsProgramOwner } from '../../program/validators/program-owner.validator';
import { utcStandardDateTransformer } from '../../shared/utils/utc-standard-date-transformer';
import { arrayUtcStandardDateTransformer } from '../../shared/utils/array-utc-standard-date-transformer';

export class AddClientProgramDto {
  @ApiProperty({ type: 'string' })
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsProgramOwner()
  @IsExistingProgram()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  program: ObjectId;

  @IsDate()
  @Transform(utcStandardDateTransformer)
  endDate: Date;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate({ each: true })
  @Transform(arrayUtcStandardDateTransformer)
  followUpDates: Date[];

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
