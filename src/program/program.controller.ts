import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { AddProgramDto } from './inputs/add-program.dto';
import { RequestContext } from './../shared/interfaces/request-context.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';
import { UpdateProgramDto } from './inputs/update-program.dto';
import { ObjectId } from 'mongoose';

@ApiTags('program')
@Controller('program')
@ApiBearerAuth()
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  async addProgram(
    @Request() request: RequestContext,
    @Body() addWProgramDto: AddProgramDto,
  ) {
    return await this.programService.addProgram(
      request.user._id,
      addWProgramDto,
    );
  }

  @Put(':id')
  async updateProgram(
    @Request() request: RequestContext,
    @Param() programId: MongoIdDto,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return await this.programService.updateProgram(
      request.user._id,
      programId.id,
      updateProgramDto,
    );
  }

  @Delete(':id')
  async deleteProgram(
    @Request() request: RequestContext,
    @Param() programId: MongoIdDto,
  ) {
    return await this.programService.deleteProgram(
      request.user._id,
      programId.id,
    );
  }

  @Get('filter')
  async filterPrograms(@Request() request: RequestContext) {
    return await this.programService.filterPrograms(request.user._id);
  }
}
