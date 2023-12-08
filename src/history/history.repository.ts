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
        $addFields: {
          date: {
            $ifNull: [
              {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: '$measuredAt',
                },
              },
              {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: '$createdAt',
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          date: 1,
          _id: 0,
        },
      },
      {
        $match: {
          ...(getHistoryDatesDto.date && {
            date: getHistoryDatesDto.date.toISOString().slice(0, 10),
          }),
        },
      },
      {
        $group: {
          _id: '$date',
        },
      },
      {
        $project: {
          date: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
          date: 1,
        },
      },
      {
        $sort: { date: -1 },
      },
    ]);
  }

  filterHistory(client: ObjectId, filterHistoryDto: FilterHistoryDto) {
    const { createdAt, measuredAt, ...historyDto } = filterHistoryDto;
    return this.historySchema.aggregate([
      {
        $match: {
          client,
        },
      },
      {
        $addFields: {
          dateOfHistoryRecorded: {
            $ifNull: [
              {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: '$measuredAt',
                },
              },
              {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: '$createdAt',
                },
              },
            ],
          },
        },
      },
      {
        $match: {
          ...historyDto,
          ...(filterHistoryDto.createdAt && {
            dateOfHistoryRecorded: filterHistoryDto.createdAt
              .toISOString()
              .slice(0, 10),
          }),
          ...(filterHistoryDto.measuredAt && {
            dateOfHistoryRecorded: filterHistoryDto.measuredAt
              .toISOString()
              .slice(0, 10),
          }),
        },
      },
      {
        $lookup: {
          from: 'exercises',
          localField: 'exercise',
          foreignField: '_id',
          as: 'exercise',
        },
      },
      { $unwind: '$exercise' },
      {
        $sort: { dateOfHistoryRecorded: -1 },
      },
    ]);
  }
}
