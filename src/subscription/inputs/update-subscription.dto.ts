import { Transform, Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { IsExistingPlan } from '../../plan/validators/existing-plan.validator';

export class UpdateSubscriptionDto {
  @ValidateIfDefined()
  @IsBoolean()
  @Type(() => Boolean)
  accepted?: boolean;

  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsExistingPlan()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  plan?: ObjectId;
}
