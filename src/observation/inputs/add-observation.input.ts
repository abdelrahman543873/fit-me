import { ApiProperty } from '@nestjs/swagger';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';
import { OBSERVATION_TYPE } from '../observation.constants';
import { Allow, ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsClientSubscribed } from '../../subscription/validators/subscribed-client.validator';

export class AddObservationDto {
  @ApiProperty({ type: 'string' })
  @IsExistingClient()
  @IsMongoIdObject()
  @IsClientSubscribed()
  @Transform(objectIdTransformer)
  client: ObjectId;

  @ApiProperty({ type: 'string', enum: OBSERVATION_TYPE })
  @IsEnum(OBSERVATION_TYPE)
  type: OBSERVATION_TYPE;

  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  note?: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Allow()
  user?;

  @ApiProperty({ isArray: true, type: String, format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Allow()
  media?: string[];
}
