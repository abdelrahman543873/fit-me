import { IsArray, ValidateNested } from 'class-validator';
import { AddItemDto } from './add-item.dto';
import { Type } from 'class-transformer';

export class AddItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddItemDto)
  items: AddItemDto[];
}
