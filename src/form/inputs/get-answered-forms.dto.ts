import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';
export class GetAnsweredFormsDto {
  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client?: ObjectId;
}
