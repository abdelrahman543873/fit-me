import {
  Allow,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { IsExistingQuestion } from '../../question/validators/existing-question.validator';
import { IsExistingFollowUp } from '../../follow-up/validators/existing-follow-up.validator';
import { FollowUpQuestionHasFollowUp } from '../../question/validators/follow-up-question-has-follow-up.validator';
import { IsQuestionOfFollowUp } from '../../follow-up/validators/question-of-follow-up.validator';

export class AddAnswerDto {
  @ApiProperty({ type: 'string' })
  @IsExistingQuestion()
  @FollowUpQuestionHasFollowUp()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  question: ObjectId;

  @ValidateIfDefined()
  @IsString()
  @IsNotEmpty()
  text?: string;

  @ApiProperty({ type: String, format: 'binary' })
  @Allow()
  media?: string;

  @ApiProperty({ isArray: true, type: String })
  @ValidateIfDefined()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Allow()
  choices?: string[];

  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsExistingFollowUp()
  @IsQuestionOfFollowUp()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  followUp?: ObjectId;
}
