import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ValidateIfDefined } from '../validators/validate-if-defined.validator';

export class Pagination {
  @ValidateIfDefined()
  @ApiProperty({
    default: 0,
    description:
      'number of skipped pages , number of skipped elements = offset * limit ',
  })
  @Type(() => Number)
  @IsNumber()
  offset?: number = 0;

  @ValidateIfDefined()
  @ApiProperty({
    default: 15,
    description: 'max number of elements per page',
  })
  @Type(() => Number)
  @IsNumber()
  limit?: number = 15;
}
