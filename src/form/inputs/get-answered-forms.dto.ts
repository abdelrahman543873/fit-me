import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';
import { IsEnum } from 'class-validator';
import { FOLLOW_UP_STATUS } from '../../follow-up/follow-up.constants';
export class GetAnsweredFormsDto {
  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client?: ObjectId;

  @ValidateIfDefined()
  @IsEnum(FOLLOW_UP_STATUS)
  status?: FOLLOW_UP_STATUS;
}
