import { PartialType } from '@nestjs/swagger';
import { AddHistoryDto } from './add-history.dto';

export class UpdateHistoryDto extends PartialType(AddHistoryDto) {}
