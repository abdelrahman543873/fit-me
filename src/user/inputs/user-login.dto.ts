import { IsPhoneNumber, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @MinLength(8)
  @MaxLength(256)
  password: string;
}
