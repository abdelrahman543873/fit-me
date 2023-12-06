import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History, HistoryDocument } from './history.schema';
import { Model, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddHistoryDto } from './inputs/add-history.dto';
import { FilterHistoryDto } from './inputs/filter-history.dto';
import { UpdateHistoryDto } from './inputs/update-history.dto';
import { GetHistoryDatesDto } from './inputs/get-history-dates.dto';

@Injectable()
export class HistoryRepository extends BaseRepository<History> {
  constructor(
    @InjectModel(History.name)
    private historySchema: Model<HistoryDocument>,
  ) {
    super(historySchema);
  }

  addHistory(
    client: ObjectId,
    addHistoryDto: AddHistoryDto,
    media?: Express.Multer.File,
  ) {
    return this.historySchema.create({
      ...addHistoryDto,
      client,
      ...(media && {
        media: `${process.env.HOST}${media.filename}`,
      }),
    });
  }

  updateHistory(
    client: ObjectId,
    addHistoryDto: UpdateHistoryDto,
    id: ObjectId,
    media?: Express.Multer.File,
  ) {
    return this.historySchema.findOneAndUpdate(
      {
        _id: id,
        client,
      },
      {
        _id: id,
        ...addHistoryDto,
        ...(media && {
          media: `${process.env.HOST}${media.filename}`,
        }),
      },
      { new: true },
    );
  }

  deleteHistory(client: ObjectId, id: ObjectId) {
    return this.historySchema.findOneAndDelete({
      _id: id,
      client,
    });
  }

  getHistoryDates(client: ObjectId, getHistoryDatesDto: GetHistoryDatesDto) {
    return this.historySchema.aggregate([
      { $match: { client } },
      {
        $project: {
          date: {
            $ifNull: ['$measuredAt', '$createdAt'],
          },
          _id: 0,
        },
      },
      {
        $match: {
          ...(getHistoryDatesDto.date && {
            $expr: {
              $eq: [
                `${
                  getHistoryDatesDto.date.getMonth() + 1
                }/${getHistoryDatesDto.date.getFullYear()}`,
                { $dateToString: { date: '$date', format: '%m/%Y' } },
              ],
            },
          }),
        },
      },
      {
        $sort: { date: -1 },
      },
    ]);
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
