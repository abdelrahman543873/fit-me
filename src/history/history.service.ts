import { Injectable } from '@nestjs/common';
import { HistoryRepository } from './history.repository';
import { AddHistoryDto } from './inputs/add-history.schema';
import { ObjectId } from 'mongoose';

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  addHistory(client: ObjectId, addHistoryDto: AddHistoryDto) {
    return this.historyRepository.addHistory(client, addHistoryDto);
  }
}
