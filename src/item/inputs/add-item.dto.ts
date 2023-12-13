import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ITEM_UNITS_ENUM } from '../item.constants';

export class AddItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsEnum(ITEM_UNITS_ENUM)
  unit: ITEM_UNITS_ENUM;
}
