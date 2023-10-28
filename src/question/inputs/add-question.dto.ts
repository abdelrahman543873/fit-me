import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { QUESTION_TYPES } from '../question.constants';
import { ObjectId } from 'mongoose';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { Transform } from 'class-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingForm } from '../../form/validators/existing-form.validator';

export class AddQuestionDto {
  @IsExistingForm()
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  formId?: ObjectId;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(QUESTION_TYPES)
  type: QUESTION_TYPES;

  @ValidateIf((input) => 'choices' in input)
  @IsArray()
  @IsString({ each: true })
  choices?: string[];
}
