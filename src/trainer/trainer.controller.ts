import { Controller, Get, Param } from '@nestjs/common';
import { VerifyTrainerDto } from './inputs/verify-trainer.dto';
import { TrainerService } from './trainer.service';
import { Public } from '../shared/decorators/public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.schema';

@ApiTags('trainer')
@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @ApiResponse({ type: User })
  @Public()
  @Get('verify/:id')
  async verifyTrainer(@Param() verifyTrainerDto: VerifyTrainerDto) {
    return await this.trainerService.verifyTrainer(verifyTrainerDto);
  }
}
