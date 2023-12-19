import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observation, ObservationDocument } from './observation.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddObservationDto } from './inputs/add-observation.input';

@Injectable()
export class ObservationRepository extends BaseRepository<Observation> {
  constructor(
    @InjectModel(Observation.name)
    private observationSchema: Model<ObservationDocument>,
  ) {
    super(observationSchema);
  }

  addObservation(trainer: ObjectId, addObservationDto: AddObservationDto) {
    return this.observationSchema.create({ ...addObservationDto, trainer });
  }
}
