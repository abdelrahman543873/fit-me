import { PartialType } from '@nestjs/swagger';
import { AddDietDto } from './add-diet.dto';

export class UpdateDietDto extends PartialType(AddDietDto) {}
