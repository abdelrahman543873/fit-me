import { ObjectId } from 'mongoose';
import { IsExistingForm } from '../../form/validators/existing-form.validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { Transform, Type } from 'class-transformer';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { AddFollowUpDto } from './add-follow-up.dto';
import { IsEnum, IsNumber } from 'class-validator';
import { FOLLOW_UP_STATUS } from '../follow-up.constants';

export class FilterFollowUpsDto extends PartialType(
  OmitType(AddFollowUpDto, ['user']),
) {
  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsExistingForm()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  form?: ObjectId;

  @ValidateIfDefined()
  @ApiProperty({
    default: 0,
    description:
      'number of skipped pages , number of skipped elements = offset * limit ',
  })
  @Type(() => Number)
  @IsNumber()
  offset?: number = 0;

  @ValidateIfDefined()
  @IsEnum(FOLLOW_UP_STATUS)
  status?: FOLLOW_UP_STATUS;

  @ValidateIfDefined()
  @ApiProperty({
    default: 15,
    description: 'max number of elements per page',
  })
  @Type(() => Number)
  @IsNumber()
  limit?: number = 15;
}
