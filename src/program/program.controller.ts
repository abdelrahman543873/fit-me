import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ProgramService } from './program.service';
import { AddProgramDto } from './inputs/add-program.dto';
import { RequestContext } from './../shared/interfaces/request-context.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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

  @Get('filter')
  async filterPrograms(@Request() request: RequestContext) {
    return await this.programService.filterPrograms(request.user._id);
  }
}
