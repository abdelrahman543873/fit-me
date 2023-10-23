import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
  ],
  providers: [PlanService, PlanRepository],
  controllers: [PlanController],
})
export class PlanModule {}
