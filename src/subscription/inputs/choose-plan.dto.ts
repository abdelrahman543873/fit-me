import { ApiProperty } from '@nestjs/swagger';
import { IsExistingPlan } from '../../plan/validators/existing-plan.validator';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';

export class ChoosePlanDto {
  @ApiProperty({ type: 'string' })
  @IsExistingPlan()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;
}
