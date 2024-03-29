import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProgram, ClientProgramDocument } from './client-program.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { AddClientProgramDto } from './inputs/add-client-program.dto';
import { FilterClientProgramDto } from './inputs/filter-client-program.dto';
import { AddedFollowUpEvent } from '../follow-up/events/added-follow-up';
import { CLIENT_PROGRAM_STATUS_FIlTER } from './client-program.constants';

@Injectable()
export class ClientProgramRepository extends BaseRepository<ClientProgram> {
  constructor(
    @InjectModel(ClientProgram.name)
    private clientProgramSchema: AggregatePaginateModel<ClientProgramDocument>,
  ) {
    super(clientProgramSchema);
  }

  addClientProgram(addClientProgramDto: AddClientProgramDto) {
    return this.clientProgramSchema.create(addClientProgramDto);
  }

  getWorkouts(client: ObjectId) {
    return this.clientProgramSchema.aggregate([
      {
        $match: {
          client,
        },
      },
      {
        $limit: 1,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'programworkouts',
          localField: 'program',
          foreignField: 'program',
          as: 'workouts',
        },
      },
      { $project: { workouts: 1 } },
      { $unwind: '$workouts' },
      { $replaceRoot: { newRoot: '$workouts' } },
      { $project: { workout: 1, _id: 0 } },
      { $project: { _id: '$workout' } },
      {
        $lookup: {
          from: 'workouts',
          localField: '_id',
          foreignField: '_id',
          as: 'workout',
        },
      },
      { $unwind: '$workout' },
      { $replaceRoot: { newRoot: '$workout' } },
    ]);
  }

  updateLastFollowUpDate(addedFollowUpEvent: AddedFollowUpEvent) {
    const lastFollowUpDate = new Date();
    lastFollowUpDate.setHours(0, 0, 0, 0);
    return this.clientProgramSchema.findOneAndUpdate(
      {
        client: addedFollowUpEvent.client,
      },
      { lastFollowUpDate },
      { sort: { createdAt: -1 } },
    );
  }

  filterClientPrograms(
    trainer: ObjectId,
    filterClientProgramDto: FilterClientProgramDto,
  ) {
    const todayDateZeroedHours = new Date();
    todayDateZeroedHours.setHours(0, 0, 0, 0);
    const aggregation = this.clientProgramSchema.aggregate([
      {
        $match: {
          ...(filterClientProgramDto.client && {
            client: filterClientProgramDto.client,
          }),
        },
      },
      {
        $match: {
          ...(filterClientProgramDto.status ===
            CLIENT_PROGRAM_STATUS_FIlTER.FUTURE && {
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
          ...(filterClientProgramDto.status ===
            CLIENT_PROGRAM_STATUS_FIlTER.PAST && {
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
          ...(filterClientProgramDto.status ===
            CLIENT_PROGRAM_STATUS_FIlTER.PRESENT && {
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
          from: 'programs',
          localField: 'program',
          foreignField: '_id',
          as: 'program',
        },
      },
      { $unwind: '$program' },
      {
        $match: {
          $expr: {
            $eq: ['$program.trainer', trainer],
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
          ...(filterClientProgramDto.status ===
            CLIENT_PROGRAM_STATUS_FIlTER.FUTURE && {
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
          ...(filterClientProgramDto.status ===
            CLIENT_PROGRAM_STATUS_FIlTER.PAST && {
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
          ...(filterClientProgramDto.status ===
            CLIENT_PROGRAM_STATUS_FIlTER.PRESENT && {
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
    return this.clientProgramSchema.aggregatePaginate(aggregation, {
      offset: filterClientProgramDto.offset * filterClientProgramDto.limit,
      limit: filterClientProgramDto.limit,
    });
  }
}
