import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History, HistoryDocument } from './history.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddHistoryDto } from './inputs/add-history.schema';
import { FilterHistoryDto } from './inputs/filter-history.schema';

@Injectable()
export class HistoryRepository extends BaseRepository<History> {
  constructor(
    @InjectModel(History.name)
    private historySchema: Model<HistoryDocument>,
  ) {
    super(historySchema);
  }

  addHistory(client: ObjectId, addHistoryDto: AddHistoryDto) {
    return this.historySchema.create({ ...addHistoryDto, client });
  }

  filterHistory(client: ObjectId, filterHistoryDto: FilterHistoryDto) {
    return this.historySchema.aggregate([
      {
        $match: {
          ...filterHistoryDto,
          client,
          ...(filterHistoryDto.createdAt && {
            $expr: {
              $eq: [
                filterHistoryDto.createdAt.toLocaleDateString(),
                { $dateToString: { date: '$createdAt', format: '%d/%m/%Y' } },
              ],
            },
          }),
        },
      },
    ]);
  }
}
