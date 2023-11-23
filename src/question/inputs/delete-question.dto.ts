import { ObjectId } from 'mongoose';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { Transform } from 'class-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingQuestion } from '../validators/existing-question.validator';
import { Allow } from 'class-validator';
import { IsQuestionOwner } from '../validators/question-owner.validator';

export class DeleteQuestionDto {
  @ApiProperty({ type: 'string' })
  @IsQuestionOwner()
  @IsExistingQuestion()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
