import { Injectable } from '@nestjs/common';
import { ObservationRepository } from './observation.repository';
import { AddObservationDto } from './inputs/add-observation.input';
import { ObjectId } from 'mongoose';

@Injectable()
export class ObservationService {
  constructor(private readonly observationRepository: ObservationRepository) {}
  addObservation(trainer: ObjectId, addObservationDto: AddObservationDto) {
    return this.observationRepository.addObservation(
      trainer,
      addObservationDto,
    );
  }
}
