import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProgram, ClientProgramDocument } from './client-program.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { AddClientProgramDto } from './inputs/add-client-program.dto';
import { FilterClientProgramDto } from './inputs/filter-client-program.dto';

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
