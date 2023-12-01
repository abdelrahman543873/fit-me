import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { USER_GENDER, USER_ROLE } from '../user.constants';
import { IsExistingTrainer } from '../validators/existing-trainer.validator';
import { IsExistingPhoneNumber } from '../validators/existing-phone-number.validator';
import { IsExistingEmail } from '../validators/existing-email.validator';
import { ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { IsDate } from 'class-validator';
import { utcStandardDateTransformer } from '../../shared/utils/utc-standard-date-transformer';

export class UserRegisterDto {
  @IsOptional()
  @IsExistingEmail()
  @IsEmail()
  email?: string;

  @MinLength(8)
  @MaxLength(256)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsExistingPhoneNumber()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  profilePicture?: string;

  @IsEnum(USER_ROLE)
  role: USER_ROLE;

  @ValidateIfDefined()
  @IsEnum(USER_GENDER)
  gender?: USER_GENDER;

  @ValidateIfDefined()
  @IsDate()
  @Transform(utcStandardDateTransformer)
  birthday?: Date;

  @IsOptional()
  @IsExistingTrainer()
  @ApiProperty({ type: 'string' })
  @IsMongoIdObject()
  @Transform(objectIdTransformer)
  trainer?: ObjectId;

  @IsISO31661Alpha2()
  countryCode: string;
}
