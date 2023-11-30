import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { IsExistingForm } from '../../form/validators/existing-form.validator';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsExistingFollowUp } from '../../follow-up/validators/existing-follow-up.validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsFollowUpOwner } from '../../follow-up/validators/follow-up-owner.validator';

export class GetUnansweredQuestionsDto {
  @IsExistingForm()
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  form: ObjectId;

  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsFollowUpOwner()
  @IsMongoIdObject()
  @IsExistingFollowUp()
  @Transform(objectIdTransformer)
  followUp?: ObjectId;
}
