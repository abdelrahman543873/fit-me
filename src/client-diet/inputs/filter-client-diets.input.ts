import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ObjectId } from 'mongoose';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { Pagination } from '../../shared/inputs/pagination.input';
import { IsEnum } from 'class-validator';
import { CLIENT_DIET_PROGRAM_STATUS_FIlTER } from '../client-diet.constants';

export class FilterClientDietsDto extends Pagination {
  @ApiProperty({ type: String })
  @ValidateIfDefined()
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client?: ObjectId;

  @ApiProperty({ type: String, enum: CLIENT_DIET_PROGRAM_STATUS_FIlTER })
  @ValidateIfDefined()
  @IsEnum(CLIENT_DIET_PROGRAM_STATUS_FIlTER)
  status?: CLIENT_DIET_PROGRAM_STATUS_FIlTER;
}
