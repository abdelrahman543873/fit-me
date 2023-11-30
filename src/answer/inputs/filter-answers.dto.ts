import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { IsExistingForm } from '../../form/validators/existing-form.validator';
import { IsExistingFollowUp } from '../../follow-up/validators/existing-follow-up.validator';
import { IsFollowUpOwner } from '../../follow-up/validators/follow-up-owner.validator';
import { Allow } from 'class-validator';

export class FilterAnswersDto {
  @ValidateIfDefined()
  @IsExistingClient()
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client?: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsExistingForm()
  @ValidateIfDefined()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  form?: ObjectId;

  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsFollowUpOwner()
  @IsMongoIdObject()
  @IsExistingFollowUp()
  @Transform(objectIdTransformer)
  followUp?: ObjectId;

  @Allow()
  user?;
}
