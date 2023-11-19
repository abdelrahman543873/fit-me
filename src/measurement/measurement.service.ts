import { Injectable } from '@nestjs/common';
import { MeasurementRepository } from './measurement.repository';
import { AddMeasurementDto } from './inputs/add-measurement.dto';
import { ObjectId } from 'mongoose';
import { FilterMeasurementsDto } from './inputs/filter-measurements.dto';

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

  filterMeasurements(
    client: ObjectId,
    filterMeasurementsDto: FilterMeasurementsDto,
  ) {
    return this.measurementRepository.filterMeasurements(
      client,
      filterMeasurementsDto,
    );
  }
}
