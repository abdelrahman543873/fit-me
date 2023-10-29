import {
  Allow,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MUSCLE_GROUP } from '../exercise.constants';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class AddExerciseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(MUSCLE_GROUP)
  muscleGroup: MUSCLE_GROUP;

  @ApiProperty({ isArray: true, type: String, format: 'binary' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Allow()
  media?: string[];

  @ApiProperty({ isArray: true, type: String, required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  links?: string[];

  @IsString()
  instructions?: string;
}
