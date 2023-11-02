import { PartialType } from '@nestjs/swagger';
import { AddWorkoutDto } from './add-workout.dto';

export class UpdateWorkoutDto extends PartialType(AddWorkoutDto) {}
