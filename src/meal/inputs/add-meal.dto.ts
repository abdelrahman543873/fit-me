import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ITEM_UNITS_ENUM, MACRO_TYPES } from '../meal.constants';
import { Type, Transform } from 'class-transformer';
import { ValidateIfDefined } from '../../shared/validators/validate-if-defined.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistingDiet } from '../../diet/validators/existing-diet.validator';
import { IsMongoIdObject } from '../../shared/validators/mongo-id-object.validator';
import { objectIdTransformer } from '../../shared/utils/objectid-transformer';
import { ObjectId } from 'mongoose';

export class Macro {
  @IsEnum(MACRO_TYPES)
  type: MACRO_TYPES;

  @IsNumber()
  value: number;
}

class Item {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  quantity: number;

  @IsEnum(ITEM_UNITS_ENUM)
  unit: ITEM_UNITS_ENUM;

  @ValidateIfDefined()
  @IsString()
  @IsNotEmpty()
  group?: string;
}

export class AddMealDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @ValidateIfDefined()
  @IsNotEmpty()
  @IsString()
  notes?: string;

  @ValidateIfDefined()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Macro)
  macros?: Macro[];

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}
