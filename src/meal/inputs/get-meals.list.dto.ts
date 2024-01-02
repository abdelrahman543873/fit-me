import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingDiet } from '../../diet/validators/existing-diet.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';

export class GetMealsListDto {
  @ApiProperty({ type: 'string' })
  @IsExistingDiet()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  diet: ObjectId;
}
