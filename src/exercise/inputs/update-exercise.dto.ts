import { PartialType } from '@nestjs/swagger';
import { AddExerciseDto } from './add-exercise.dto';

export class UpdateExerciseDto extends PartialType(AddExerciseDto) {}
