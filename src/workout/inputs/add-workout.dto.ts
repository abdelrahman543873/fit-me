import { IsNotEmpty, IsString } from 'class-validator';

export class AddWorkoutDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
