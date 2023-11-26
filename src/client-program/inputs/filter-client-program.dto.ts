import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ObjectId } from 'mongoose';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { Pagination } from '../../shared/inputs/pagination.input';
import { CLIENT_PROGRAM_STATUS_FIlTER } from '../client-program.constants';
import { IsEnum } from 'class-validator';

export class FilterClientProgramDto extends Pagination {
  @ApiProperty({ type: 'string' })
  @ValidateIfDefined()
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client?: ObjectId;

  @ValidateIfDefined()
  @IsEnum(CLIENT_PROGRAM_STATUS_FIlTER)
  status?: CLIENT_PROGRAM_STATUS_FIlTER;
}
