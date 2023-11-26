import { Allow, IsIn } from 'class-validator';
import { FOLLOW_UP_STATUS } from '../follow-up.constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFollowUpDto {
  @IsIn([FOLLOW_UP_STATUS.FILLED, FOLLOW_UP_STATUS.COMPLETED])
  status: FOLLOW_UP_STATUS;

  @ApiProperty({ readOnly: true })
  @Allow()
  user?;
}
