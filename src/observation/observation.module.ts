import { Module } from '@nestjs/common';
import { ObservationController } from './observation.controller';
import { ObservationService } from './observation.service';
import { ObservationRepository } from './observation.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Observation, ObservationSchema } from './observation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Observation.name, schema: ObservationSchema },
    ]),
  ],
  controllers: [ObservationController],
  providers: [ObservationService, ObservationRepository],
})
export class ObservationModule {}
