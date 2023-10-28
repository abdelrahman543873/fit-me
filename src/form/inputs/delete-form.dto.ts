import { ApiProperty } from '@nestjs/swagger';
import { IsExistingForm } from '../validators/existing-form.validator';
import { IsFormOwner } from '../validators/form-owner.validator';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { Transform } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';
import { Allow } from 'class-validator';
import { User } from '../../user/user.schema';

export class DeleteFormDto {
  @ApiProperty({ type: 'string' })
  @IsFormOwner()
  @IsExistingForm()
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  id: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?: User;
}
