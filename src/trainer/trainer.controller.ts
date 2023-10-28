import { Controller, Get, Param } from '@nestjs/common';
import { VerifyTrainerDto } from './inputs/verify-trainer.dto';
import { TrainerService } from './trainer.service';
import { Public } from '../shared/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('trainer')
@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Public()
  @Get('verify/:id')
  async verifyTrainer(@Param() verifyTrainerDto: VerifyTrainerDto) {
    return await this.trainerService.verifyTrainer(verifyTrainerDto);
  }
}
