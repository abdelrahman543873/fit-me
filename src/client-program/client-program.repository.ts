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

  updateLastFollowUpDate(addedFollowUpEvent: AddedFollowUpEvent) {
    return this.clientProgramSchema.findOneAndUpdate(
      {
        client: addedFollowUpEvent.client,
      },
      { lastFollowUpDate: new Date() },
      { sort: { createdAt: -1 } },
    );
  }

  filterClientPrograms(
    trainer: ObjectId,
    filterClientProgramDto: FilterClientProgramDto,
  ) {
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
              $allElementsTrue: {
                $map: {
                  input: '$followUpDates',
                  as: 'date',
                  in: {
                    $gt: ['$$date', '$lastFollowUpDate'],
                  },
                },
              },
            },
          }),
          ...(filterClientProgramDto.status ===
            CLIENT_PROGRAM_STATUS_FIlTER.PAST && {
            $expr: {
              $allElementsTrue: {
                $map: {
                  input: '$followUpDates',
                  as: 'date',
                  in: {
                    $lt: ['$$date', '$lastFollowUpDate'],
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
                    $eq: ['$$date', '$lastFollowUpDate'],
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
