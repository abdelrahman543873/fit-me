import { ApiProperty } from '@nestjs/swagger';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';
import { OBSERVATION_TYPE } from '../observation.constants';
import { Allow, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsClientSubscribed } from '../../subscription/validators/subscribed-client.validator';

export class AddObservationDto {
  @ApiProperty({ type: 'string' })
  @IsExistingClient()
  @IsMongoIdObject()
  @IsClientSubscribed()
  @Transform(objectIdTransformer)
  client: ObjectId;

  @IsEnum(OBSERVATION_TYPE)
  type: OBSERVATION_TYPE;

  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  note?: string;

  @Allow()
  user?;
}
