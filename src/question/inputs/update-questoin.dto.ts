import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddQuestionDto } from './add-question.dto';
import { ObjectId } from 'mongoose';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsExistingQuestion } from '../validators/existing-question.validator';

export class UpdateQuestionDto extends PartialType(AddQuestionDto) {
  @ApiProperty({ type: 'string' })
  @IsExistingQuestion()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;
}
