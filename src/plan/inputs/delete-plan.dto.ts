import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsExistingPlan } from '../validators/existing-plan.validator';

export class DeletePlanDto {
  @ApiProperty({ type: 'string' })
  @IsExistingPlan()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;
}
