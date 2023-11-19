import { Injectable } from '@nestjs/common';
import { MeasurementRepository } from './measurement.repository';
import { AddMeasurementDto } from './inputs/add-measurement.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class MeasurementService {
  constructor(private readonly measurementRepository: MeasurementRepository) {}

  addMeasurement(
    client: ObjectId,
    addMeasurementDto: AddMeasurementDto,
    media?: Express.Multer.File,
  ) {
    return this.measurementRepository.addMeasurement(
      client,
      addMeasurementDto,
      media,
    );
  }
}
