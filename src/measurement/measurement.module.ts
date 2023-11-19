import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Measurement, MeasurementSchema } from './measurement.schema';
import { MeasurementRepository } from './measurement.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utils/multer-file-name';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Measurement.name, schema: MeasurementSchema },
    ]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client',
        filename,
      }),
    }),
  ],
  providers: [MeasurementService, MeasurementRepository],
  controllers: [MeasurementController],
})
export class MeasurementModule {}
