import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientDiet, ClientDietDocument } from './client-diet.schema';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddClientDietDto } from './inputs/add-client-diet.input';
import { AddedFollowUpEvent } from '../follow-up/events/added-follow-up';
import { FilterClientDietsDto } from './inputs/filter-client-diets.input';
import { CLIENT_DIET_PROGRAM_STATUS_FIlTER } from './client-diet.constants';

@Injectable()
export class ClientDietRepository extends BaseRepository<ClientDiet> {
  constructor(
    @InjectModel(ClientDiet.name)
    private clientDietSchema: AggregatePaginateModel<ClientDietDocument>,
  ) {
    super(clientDietSchema);
  }

  addClientDiet(addClientDietDto: AddClientDietDto) {
    return this.clientDietSchema.create(addClientDietDto);
  }

  updateLastFollowUpDate(addedFollowUpEvent: AddedFollowUpEvent) {
    const lastFollowUpDate = new Date();
    lastFollowUpDate.setHours(0, 0, 0, 0);
    return this.clientDietSchema.findOneAndUpdate(
      {
        client: addedFollowUpEvent.client,
      },
      { lastFollowUpDate },
      { sort: { createdAt: -1 } },
    );
  }

  filterClientDiets(
    trainer: ObjectId,
    filterClientDietsDto: FilterClientDietsDto,
  ) {
    const todayDateZeroedHours = new Date();
    todayDateZeroedHours.setHours(0, 0, 0, 0);
    const aggregation = this.clientDietSchema.aggregate([
      {
        $match: {
          ...(filterClientDietsDto.client && {
            client: filterClientDietsDto.client,
          }),
        },
      },
      {
        $match: {
          ...(filterClientDietsDto.status ===
            CLIENT_DIET_PROGRAM_STATUS_FIlTER.FUTURE && {
            $expr: {
              $anyElementTrue: {
                $map: {
                  input: '$followUpDates',
                  as: 'date',
                  in: {
                    $gt: ['$$date', todayDateZeroedHours],
                  },
                },
              },
            },
          }),
          ...(filterClientDietsDto.status ===
            CLIENT_DIET_PROGRAM_STATUS_FIlTER.PAST && {
            $expr: {
              $anyElementTrue: {
                $map: {
                  input: '$followUpDates',
                  as: 'date',
                  in: {
                    $and: [
                      { $lt: ['$$date', todayDateZeroedHours] },
                      {
                        $lt: ['$$date', '$lastFollowUpDate'],
                      },
                    ],
                  },
                },
              },
            },
          }),
          ...(filterClientDietsDto.status ===
            CLIENT_DIET_PROGRAM_STATUS_FIlTER.PRESENT && {
            $expr: {
              $anyElementTrue: {
                $map: {
                  input: '$followUpDates',
                  as: 'date',
                  in: {
                    $and: [
                      { $eq: ['$$date', todayDateZeroedHours] },
                      {
                        $ne: ['$$date', '$lastFollowUpDate'],
                      },
                    ],
                  },
                },
              },
            },
          }),
        },
      },
      {
        $lookup: {
          from: 'diets',
          localField: 'diet',
          foreignField: '_id',
          as: 'diet',
        },
      },
      { $unwind: '$diet' },
      {
        $match: {
          $expr: {
            $eq: ['$diet.trainer', trainer],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'client',
          foreignField: '_id',
          as: 'client',
        },
      },
      { $unwind: '$client' },
      {
        $addFields: {
          ...(filterClientDietsDto.status ===
            CLIENT_DIET_PROGRAM_STATUS_FIlTER.FUTURE && {
            dueDate: {
              $min: {
                $filter: {
                  input: '$followUpDates',
                  as: 'date',
                  cond: {
                    $gt: ['$$date', todayDateZeroedHours],
                  },
                },
              },
            },
          }),
          ...(filterClientDietsDto.status ===
            CLIENT_DIET_PROGRAM_STATUS_FIlTER.PAST && {
            dueDate: {
              $min: {
                $filter: {
                  input: '$followUpDates',
                  as: 'date',
                  cond: {
                    $and: [
                      { $lt: ['$$date', todayDateZeroedHours] },
                      {
                        $lt: ['$$date', '$lastFollowUpDate'],
                      },
                    ],
                  },
                },
              },
            },
          }),
          ...(filterClientDietsDto.status ===
            CLIENT_DIET_PROGRAM_STATUS_FIlTER.PRESENT && {
            dueDate: todayDateZeroedHours,
          }),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return this.clientDietSchema.aggregatePaginate(aggregation, {
      offset: filterClientDietsDto.offset * filterClientDietsDto.limit,
      limit: filterClientDietsDto.limit,
    });
  }
}
