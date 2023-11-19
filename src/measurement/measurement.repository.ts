import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Measurement, MeasurementDocument } from './measurement.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddMeasurementDto } from './inputs/add-measurement.dto';

@Injectable()
export class MeasurementRepository extends BaseRepository<Measurement> {
  constructor(
    @InjectModel(Measurement.name)
    private measurementSchema: Model<MeasurementDocument>,
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
}
