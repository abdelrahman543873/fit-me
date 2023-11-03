import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { AddProgramDto } from './inputs/add-program.dto';
import { RequestContext } from './../shared/interfaces/request-context.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';

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
