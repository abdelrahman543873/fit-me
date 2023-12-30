import { Injectable } from '@nestjs/common';
import { ObservationRepository } from './observation.repository';
import { AddObservationDto } from './inputs/add-observation.input';
import { ObjectId } from 'mongoose';
import { FilterObservationsDto } from './inputs/filter-observations.input';
import { UpdateObservationDto } from './inputs/update-observation.input';

@Injectable()
export class ObservationService {
  constructor(private readonly observationRepository: ObservationRepository) {}
  addObservation(
    trainer: ObjectId,
    addObservationDto: AddObservationDto,
    media?: Array<Express.Multer.File>,
  ) {
    return this.observationRepository.addObservation(
      trainer,
      addObservationDto,
      media,
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
    media?: Array<Express.Multer.File>,
  ) {
    return this.observationRepository.updateObservation(
      id,
      trainer,
      updateObservationDto,
      media,
    );
  }

  deleteObservation(id: ObjectId, trainer: ObjectId) {
    return this.observationRepository.deleteObservation(id, trainer);
  }
}
