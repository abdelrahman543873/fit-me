import { Module } from '@nestjs/common';
import { ObservationController } from './observation.controller';
import { ObservationService } from './observation.service';
import { ObservationRepository } from './observation.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Observation, ObservationSchema } from './observation.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utils/multer-file-name';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Observation.name, schema: ObservationSchema },
    ]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client',
        filename,
      }),
    }),
  ],
  controllers: [ObservationController],
  providers: [ObservationService, ObservationRepository],
})
export class ObservationModule {}
