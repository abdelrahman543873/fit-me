import { IsNotEmpty, IsString } from 'class-validator';

export class AddProgramDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
