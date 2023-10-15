import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { USER_ROLE } from '../user.constants';
import { ObjectId, Types } from 'mongoose';
import { IsExistingTrainer } from '../validators/existing-trainer.validator';
import { Transform } from 'class-transformer';

export class UserRegisterDto {
  @IsOptional()
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

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('EG')
  phoneNumber: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  profilePicture?: string;

  @IsEnum(USER_ROLE)
  role: USER_ROLE;

  @IsOptional()
  @IsExistingTrainer()
  @IsMongoId()
  trainerId?: string;
}
