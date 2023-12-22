import { Injectable } from '@nestjs/common';
import { ObservationRepository } from './observation.repository';
import { AddObservationDto } from './inputs/add-observation.input';
import { ObjectId } from 'mongoose';
import { FilterObservationsDto } from './inputs/filter-observations.input';
import { UpdateObservationDto } from './inputs/update-observation.input';

@Injectable()
export class ObservationService {
  constructor(private readonly observationRepository: ObservationRepository) {}
  addObservation(trainer: ObjectId, addObservationDto: AddObservationDto) {
    return this.observationRepository.addObservation(
      trainer,
      addObservationDto,
    );
  }

  filterObservations(
    trainer: ObjectId,
    filterObservationsDto: FilterObservationsDto,
  ) {
    return this.observationRepository.filterObservations(
      trainer,
      filterObservationsDto,
    );
  }

  updateObservation(
    id: ObjectId,
    trainer: ObjectId,
    updateObservationDto: UpdateObservationDto,
  ) {
    return this.observationRepository.updateObservation(
      id,
      trainer,
      updateObservationDto,
    );
  }

  deleteObservation(id: ObjectId, trainer: ObjectId) {
    return this.observationRepository.deleteObservation(id, trainer);
  }
}
