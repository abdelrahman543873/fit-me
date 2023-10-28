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
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddExerciseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(MUSCLE_GROUP)
  muscleGroup: MUSCLE_GROUP;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  media?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Type(() => Array)
  links?: string[];

  @IsString()
  instructions?: string;
}
