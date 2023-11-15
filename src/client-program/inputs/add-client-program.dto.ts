import { Transform, Type } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingClient } from '../../client/validators/existing-client.validator';
import { ObjectId } from 'mongoose';
import { IsExistingProgram } from '../../program/validators/existing-program.validator';
import { Allow, IsDate, IsDateString } from 'class-validator';
import { IsProgramOwner } from '../../program/validators/program-owner.validator';
import { User } from '../../user/user.schema';

export class AddClientProgramDto {
  @ApiProperty({ type: 'string' })
  @IsExistingClient()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  client: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsProgramOwner()
  @IsExistingProgram()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  program: ObjectId;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsDate({ each: true })
  @Type(() => Date)
  followUpDates: Date[];

  @ApiProperty({ readOnly: true })
  @Allow()
  user?: User;
}
