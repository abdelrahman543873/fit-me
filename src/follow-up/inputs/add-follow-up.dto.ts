import { ObjectId } from 'mongoose';
import { IsExistingForm } from '../../form/validators/existing-form.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { Transform } from 'class-transformer';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { MEASUREMENT_TYPE } from '../../measurement/measurement.constants';
import { Allow, IsArray, IsEnum, IsIn } from 'class-validator';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { IsFormOwner } from '../../form/validators/form-owner.validator';
import { FOLLOW_UP_STATUS } from '../follow-up.constants';
import { IsFollowUpForm } from '../../form/validators/follow-up-form.validator';

export class AddFollowUpDto {
  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsFormOwner()
  @IsFollowUpForm()
  @IsExistingForm()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  form?: ObjectId;

  @ValidateIfDefined()
  @IsArray()
  @IsEnum(MEASUREMENT_TYPE, { each: true })
  measurementTypes?: MEASUREMENT_TYPE[];

  @ApiProperty({ type: 'string' })
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client: ObjectId;

  @ValidateIfDefined()
  @IsIn([FOLLOW_UP_STATUS.SKIPPED])
  status?: FOLLOW_UP_STATUS;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
