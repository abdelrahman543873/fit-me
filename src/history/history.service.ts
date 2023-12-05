import { Injectable } from '@nestjs/common';
import { HistoryRepository } from './history.repository';
import { AddHistoryDto } from './inputs/add-history.schema';
import { ObjectId } from 'mongoose';
import { FilterHistoryDto } from './inputs/filter-history.schema';

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  addHistory(client: ObjectId, addHistoryDto: AddHistoryDto) {
    return this.historyRepository.addHistory(client, addHistoryDto);
  }

  filterHistory(client: ObjectId, filterHistoryDto: FilterHistoryDto) {
    return this.historyRepository.filterHistory(client, filterHistoryDto);
  }
}
