import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { Transform } from 'class-transformer';
import { IsExistingFollowUp } from '../validators/existing-follow-up.validator';
import { User } from '../../user/user.schema';
import { Allow } from 'class-validator';
import { IsFollowUpOwner } from '../validators/follow-up-owner.validator';

export class CompleteFollowUpsDto {
  @ApiProperty({ type: 'string' })
  @IsExistingFollowUp()
  @IsFollowUpOwner()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  user: User;
}
