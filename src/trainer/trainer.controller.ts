import { Controller, Get, Param } from '@nestjs/common';
import { VerifyTrainerDto } from './inputs/verify-trainer.dto';
import { TrainerService } from './trainer.service';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Get('verify/:id')
  async verifyTrainer(@Param() verifyTrainerDto: VerifyTrainerDto) {
    return await this.trainerService.verifyTrainer(verifyTrainerDto);
  }
}
