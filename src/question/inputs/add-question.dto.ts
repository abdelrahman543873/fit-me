import { Allow, IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QUESTION_TYPES } from '../question.constants';
import { ObjectId } from 'mongoose';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { Transform } from 'class-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingForm } from '../../form/validators/existing-form.validator';
import { IsFormOwner } from '../../form/validators/form-owner.validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';

export class AddQuestionDto {
  @IsFormOwner()
  @IsExistingForm()
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  form: ObjectId;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(QUESTION_TYPES)
  type: QUESTION_TYPES;

  @ValidateIfDefined()
  @IsArray()
  @IsString({ each: true })
  choices?: string[];

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
