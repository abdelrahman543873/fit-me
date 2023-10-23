import {
  IsCurrency,
  IsEnum,
  IsISO4217CurrencyCode,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { FOLLOW_UP_FREQUENCY, PLAN_TYPE } from '../plan.constants';
import { Type } from 'class-transformer';

export class AddPlanDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(PLAN_TYPE)
  type: PLAN_TYPE;

  @IsInt()
  monthsDuration: number;

  @IsEnum(FOLLOW_UP_FREQUENCY)
  followUpFrequency: FOLLOW_UP_FREQUENCY;

  @ValidateIf((input) => 'description' in input)
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsISO4217CurrencyCode()
  currency: string;
}
