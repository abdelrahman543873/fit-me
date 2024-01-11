import { PartialType, OmitType } from '@nestjs/swagger';
import { UserRegisterDto } from './user-register.dto';

export class UpdateUserDto extends OmitType(PartialType(UserRegisterDto), [
  'role',
]) {}
