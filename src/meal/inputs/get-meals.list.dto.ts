import { ArrayNotEmpty, IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';
import { IsExistingMeal } from '../validators/existing-meal';
import { ApiProperty } from '@nestjs/swagger';

export class GetMealsListDto {
  @ApiProperty({ type: 'string', isArray: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsExistingMeal({ each: true })
  mealsIds: ObjectId[];
}
