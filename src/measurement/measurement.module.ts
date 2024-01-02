import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Measurement, MeasurementSchema } from './measurement.schema';
import { MeasurementRepository } from './measurement.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Measurement.name, schema: MeasurementSchema },
    ]),
  ],
  providers: [MeasurementService, MeasurementRepository],
  controllers: [MeasurementController],
})
export class MeasurementModule {}
