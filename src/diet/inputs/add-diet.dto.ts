import { Macro } from '../../meal/inputs/add-meal.dto';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingMeal } from '../../meal/validators/existing-meal';
import { Type } from 'class-transformer';

export class AddDietDto {
  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  notes?: string;

  @ApiProperty({ isArray: true, type: String })
  @IsExistingMeal({ each: true })
  meals: ObjectId[];

  @ValidateIfDefined()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Macro)
  macros?: Macro[];
}
