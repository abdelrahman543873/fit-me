import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FORM_TYPES } from '../form.constants';

export class AddFormDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(FORM_TYPES)
  type: FORM_TYPES;
}
