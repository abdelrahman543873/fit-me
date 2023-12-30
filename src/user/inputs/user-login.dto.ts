import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @MinLength(8)
  @MaxLength(256)
  password: string;

  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  fcmToken?: string;
}
