import { PartialType } from '@nestjs/swagger';
import { AddFormDto } from './add-form.dto';

export class FilterFormsDto extends PartialType(AddFormDto) {}
