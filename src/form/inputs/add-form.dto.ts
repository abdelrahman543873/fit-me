import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { FORM_TYPES } from '../form.constants';
import { Type } from 'class-transformer';

export class AddFormDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(FORM_TYPES)
  type: FORM_TYPES;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isOptional?: boolean;
}
