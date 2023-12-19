import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observation, ObservationDocument } from './observation.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddObservationDto } from './inputs/add-observation.input';
import { FilterObservationsDto } from './inputs/filter-observations.input';
import { UpdateObservationDto } from './inputs/update-observation.input';

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

  filterObservations(
    trainer: ObjectId,
    filterObservationsDto: FilterObservationsDto,
  ) {
    delete filterObservationsDto.user;
    return this.observationSchema.find({ ...filterObservationsDto, trainer });
  }

  updateObservation(
    id: ObjectId,
    trainer: ObjectId,
    updateObservationDto: UpdateObservationDto,
  ) {
    delete updateObservationDto.user;
    return this.observationSchema.findOneAndUpdate(
      { trainer, _id: id },
      { ...updateObservationDto },
      { new: true },
    );
  }
}
