import { Injectable } from '@nestjs/common';
import { HistoryRepository } from './history.repository';
import { AddHistoryDto } from './inputs/add-history.dto';
import { ObjectId } from 'mongoose';
import { FilterHistoryDto } from './inputs/filter-history.dto';
import { UpdateHistoryDto } from './inputs/update-history.dto';
import { GetHistoryDatesDto } from './inputs/get-history-dates.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  addHistory(
    client: ObjectId,
    addHistoryDto: AddHistoryDto,
    media?: Express.Multer.File,
  ) {
    return this.historyRepository.addHistory(client, addHistoryDto, media);
  }

  updateHistory(
    client: ObjectId,
    addHistoryDto: UpdateHistoryDto,
    id: ObjectId,
    media?: Express.Multer.File,
  ) {
    return this.historyRepository.updateHistory(
      client,
      addHistoryDto,
      id,
      media,
    );
  }

  deleteHistory(client: ObjectId, id: ObjectId) {
    return this.historyRepository.deleteHistory(client, id);
  }

  getHistoryDates(client: ObjectId, getHistoryDatesDto: GetHistoryDatesDto) {
    return this.historyRepository.getHistoryDates(client, getHistoryDatesDto);
  }

  filterHistory(client: ObjectId, filterHistoryDto: FilterHistoryDto) {
    return this.historyRepository.filterHistory(client, filterHistoryDto);
  }
}
