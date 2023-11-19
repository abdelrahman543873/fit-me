import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement, MeasurementDocument } from './measurement.schema';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddMeasurementDto } from './inputs/add-measurement.dto';
import { FilterMeasurementsDto } from './inputs/filter-measurements.dto';

@Injectable()
export class MeasurementRepository extends BaseRepository<Measurement> {
  constructor(
    @InjectModel(Measurement.name)
    private measurementSchema: AggregatePaginateModel<MeasurementDocument>,
  ) {
    super(measurementSchema);
  }

  addMeasurement(
    client: ObjectId,
    addMeasurementDto: AddMeasurementDto,
    media: Express.Multer.File,
  ) {
    return this.measurementSchema.create({
      client,
      ...addMeasurementDto,
      ...(media && {
        media: `${process.env.HOST}${media.filename}`,
      }),
    });
  }

  filterMeasurements(
    client: ObjectId,
    filterMeasurementsDto: FilterMeasurementsDto,
  ) {
    return this.measurementSchema.aggregate([
      {
        $match: {
          client,
          ...filterMeasurementsDto,
        },
      },
      {
        $group: {
          _id: '$type',
          measurements: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          type: '$_id',
          _id: 0,
          measurements: 1,
        },
      },
    ]);
  }
}
